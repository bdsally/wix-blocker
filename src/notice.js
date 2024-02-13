// Function to replace template strings in HTML with dynamic data
function replaceTemplateStrings(template, data) {
  return template.replace(/%{\s*([^}]+)\s*}/g, (match, key) => {
    let value = data
    key.split(".").forEach((part) => {
      value = value[part]
    })
    return value || match // Return the match if key not found in data
  })
}

// Function to update the leaderboard visits by making a fetch call
async function updateLeaderboardVisits(visitedSite) {
  const url = "UPDATE_LEADERBOARD_VISITS_ENDPOINT"
  const options = {
    body: JSON.stringify({ company_name: visitedSite }),
    headers: {
      Authorization: "UPDATE_LEADERBOARD_VISITS_API_KEY",
      "Content-Type": "application/json",
    },
    method: "POST",
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => console.error("Failed to update leaderboard visits:", error))
}

// Main function to handle the extension's page load logic
function handlePageLoad() {
  if (window.hasMadeFetchCall) {
    return // Prevent duplicate execution
  }
  window.hasMadeFetchCall = true

  chrome.storage.local.get("notice", async function (result) {
    if (!result.notice) return

    const { visited_site: visitedSite } = result.notice

    // Update leaderboard visits
    const { visits } = await updateLeaderboardVisits(visitedSite)

    // Process and update the page content
    const body = document.getElementsByTagName("body")[0]
    const updatedContent = replaceTemplateStrings(body.innerHTML, { visited_site: visitedSite, visits })
    body.innerHTML = updatedContent
    body.style.display = "block"

    // Set up the bypass link
    document.getElementById("bypass-link")?.addEventListener(
      "click",
      () => {
        chrome.storage.local.set({ enabled: false })
        chrome.tabs.update({ url: `https://${visitedSite}` })
      },
      false,
    )
  })
}

// Add the event listener for the window load event
window.addEventListener("load", handlePageLoad)
