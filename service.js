chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable()

  chrome.storage.local.set({ enabled: false })

  // asynchronously fetch the alternate action icon
  // convert it to imagedata and pass it to  SetIcon
  // alternateIcon().then((imageData) => {
  //   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  //     let exampleRule = {
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { hostSuffix: ".*.*" },
  //         }),
  //       ],
  //       actions: [
  //         new chrome.declarativeContent.ShowAction(),
  //         new chrome.declarativeContent.SetIcon({ imageData }),
  //       ],
  //     }
  //
  //     let rules = [exampleRule]
  //     chrome.declarativeContent.onPageChanged.addRules(rules)
  //   })
  // })

  // var rule = {
  //   conditions: [
  //     new chrome.declarativeWebRequest.RequestMatcher({
  //       url: { hostSuffix: "wix.com" },
  //     }),
  //   ],
  //   actions: [new chrome.declarativeWebRequest.CancelRequest()],
  // }
})

// Listen for messages from the content script
function messageListener(request, _sender, _reply) {
  switch (request.message) {
    case "notification":
      chrome.notifications.create({
        title: "DFA Chat is disabled",
        iconUrl: chrome.runtime.getURL("images/white-img-16.png"),
        message: "Try during between 9am and 4.30pm",
        type: "basic",
        eventTime: Date.now(),
      })
      break
    case "count":
      chrome.action.setBadgeText({ text: request.data })
      break
    case "ready":
      chrome.storage.local.set({ count: 0, enabled: false })
      chrome.notifications.create({
        title: "The DFA Chat form is ready!",
        iconUrl: chrome.runtime.getURL("images/white-img-16.png"),
        message: "Fill in the form promptly!",
        type: "basic",
        eventTime: Date.now(),
      })

      chrome.action.setPopup({ popup: "popup/popup.html" })
      break
    default:
  }
  return true
}

chrome.runtime.onMessage.addListener(messageListener)

// async function alternateIcon() {
//   let response = await fetch(chrome.runtime.getURL("images/white-img-16.png"))
//   let blob = await response.blob()
//   let imageBitmap = await createImageBitmap(blob)
//   let osc = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
//   let ctx = osc.getContext("2d")
//   ctx.drawImage(imageBitmap, 0, 0)
//   let imageData = ctx.getImageData(0, 0, osc.width, osc.height)
//   return imageData
// }
//
