const element = document.getElementById("enabled-chkbx")
chrome.storage.local.get("enabled").then((data) => {
  element.checked = data.enabled
})

element.addEventListener("click", (e) => {
  e.target.toggleAttribute("checked")
  chrome.storage.local.set({ enabled: e.target.checked })
})
