function convertShortsUrl(url: string) {
  const regex = /\/shorts\/(.+)/
  return url.replace(regex, '/watch?v=$1')
}

chrome.contextMenus.create({
  title: 'No More Shorts',
  contexts: ['all'],
  id: 'no-more-shorts',
  documentUrlPatterns: [
    'https://*.youtube.com/shorts/*',
    'http://*.youtube.com/shorts/*',
  ],
})

chrome.contextMenus.onClicked.addListener(async () => {
  const [{ url }] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })
  const newUrl = convertShortsUrl(url!)

  chrome.tabs.update({
    url: newUrl,
  })
})

chrome.webRequest.onCompleted.addListener(
  ({ url }) => {
    const newUrl = convertShortsUrl(url!)
    chrome.tabs.update({
      url: newUrl,
    })
  },
  {
    urls: ['https://*.youtube.com/shorts/*', 'http://*.youtube.com/shorts/*'],
  }
)
