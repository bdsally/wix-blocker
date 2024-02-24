// Function to replace template strings in HTML with dynamic data
export default function replaceTemplateStrings(template, data) {
  return template.replace(/%{\s*([^}]+)\s*}/g, (match, key) => {
    let value = data
    key.split(".").forEach((part) => {
      value = value[part]
    })

    return value || match // Return the match if key not found in data
  })
}
