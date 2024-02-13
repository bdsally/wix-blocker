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
  const url = "https://dtdykmfxiqhxjwutnzkz.supabase.co/functions/v1/update-leaderboard-visits"
  const options = {
    body: JSON.stringify({ company_name: visitedSite }),
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZHlrbWZ4aXFoeGp3dXRuemt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MzkwNDYsImV4cCI6MjAyMzQxNTA0Nn0.Ls1iXTyV9v9ki-zJAl7o795VO90w0jwzjXuxi5QM47o",
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
  chrome.storage.local.get("notice", async function (result) {
    if (!result.notice) return

    const { visited_site: visitedSite } = result.notice


    // Process and update the page content
    const body = document.getElementsByTagName("body")[0]
    const updatedContent = replaceTemplateStrings(body.innerHTML, {
      visited_site: visitedSite,
      visits: localStorage.getItem(visitedSite) || 1,
    })
    body.innerHTML = updatedContent
    body.style.display = "block"

    // Update leaderboard visits
    const { visits } = await updateLeaderboardVisits(visitedSite)
    body.innerHTML = replaceTemplateStrings(body.innerHTML, { visited_site: visitedSite, visits })

    // Update the local storage with the new visits count
    localStorage.setItem(visitedSite, visits)

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
