// Listen for the extension's installation event to set initial storage values
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true })
})

// Function to handle navigation events
function onBeforeNavigate(details) {
  chrome.storage.local.get(["enabled"], (storage) => {
    if (details.url.includes("wix.com")) {
      chrome.storage.local.set({ notice: { visited_site: "wix.com" } })

      // If the extension is enabled, redirect the tab to the notice page
      if (storage.enabled) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL("/src/notice.html"),
        })
      }
    }
  })
}

// Attach the navigation event listener
chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate)

// Callback function for handling web requests
function handleWebRequest(details) {
  chrome.storage.local.get(["enabled"], (storage) => {
    let url
    let hostname = new URL(details.url).hostname

    if (hostname === "wix.com") {
      url = hostname
    } else {
      try {
        if (details.initiator) {
          let initiatorHostname = new URL(details.initiator).hostname
          url = initiatorHostname
        } else {
          url = hostname // Using `details.url` hostname as a fallback
        }
      } catch (error) {
        url = hostname // Using `details.url` hostname as a fallback
      }
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
    handleWebRequest,
    {
      urls: [
        "*://*.parastorage.com/*",
        "*://*.wixstatic.com/*",
        "*://*.wix.com/*",
      ],
    },
    [],
)