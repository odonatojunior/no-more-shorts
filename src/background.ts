chrome.runtime.onInstalled.addListener(function () {
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
    const regex = /\/shorts\/(.+)/
    const newUrl = url?.replace(regex, '/watch?v=$1')

    chrome.tabs.update({
      url: newUrl,
    })
  })
})
