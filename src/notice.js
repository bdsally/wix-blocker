var tofu = function (a, c) {
  return a.replace(/%{*([^}]+) *}/g, function (b, a) {
    b = c
    a.replace(/[^.]+/g, function (a) {
      b = b[a]
    })
    return b
  })
}

window.addEventListener("load", function () {
  var body = document.getElementsByTagName("body")[0]
  chrome.storage.local.get("notice", function (result) {
    if (result.notice) {
      ({ visited_site } = result.notice)
    }
    var text = body.innerHTML
    var template = tofu(text, { visited_site: visited_site })
    body.innerHTML = template
    body.style.display = "block"

      const bypassSite = () => {
        chrome.storage.local.set({ enabled: false })
        chrome.tabs.update({ url: `https://${visited_site}` })
      }

      const h = document.getElementById("bypass-link")
      h.addEventListener('click', bypassSite, false);
  })
})
