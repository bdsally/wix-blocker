chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true })
})

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.local.get(["enabled"]).then((storage) => {
    if (details.url.includes("wix.com")) {
      chrome.storage.local.set({ notice: { visited_site: "wix.com" } })
      if (storage.enabled) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL("/src/notice.html"),
        })
      }
    }
  })
})

let callback = function (details) {
  chrome.storage.local.get(["enabled"]).then((storage) => {
    let hostname = new URL(details.url).hostname
    let url
    if (hostname === "wix.com") {
      url = hostname
    } else {
      url = new URL(details.initiator).hostname
    }
    chrome.storage.local.set({ notice: { visited_site: url } })
    if (storage.enabled) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("/src/notice.html"),
      })
    }
  })
}

chrome.webRequest.onBeforeRequest.addListener(
  callback,
  {
    urls: [
      "*://*.parastorage.com/*",
      "*://*.wixstatic.com/*",
      "*://*.wix.com/*",
    ],
  },
  [],
)
