let element = document.getElementById("enabled-chkbx")
chrome.storage.local.get("enabled").then((data) => {
  element.checked = data.enabled
})

element.addEventListener("click", (e) => {
  e.target.toggleAttribute("checked")
  chrome.storage.local.set({ enabled: e.target.checked })
  if (e.target.checked) {
    chrome.declarativeNetRequest.updateStaticRules({
      rulesetId: "rule1",
      enableRuleIds: [1, 2, 3],
    })
  } else {
    chrome.declarativeNetRequest.updateStaticRules({
      rulesetId: "rule1",
      disableRuleIds: [1, 2, 3],
    })
  }
})
