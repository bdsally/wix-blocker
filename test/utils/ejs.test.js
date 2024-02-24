import ejs from "../../src/utils/ejs.js"

test("interpolate template variable", () => {
  const template = `Hi, I'm %{name}!`
  expect(ejs(template, { name: "Bob" })).toEqual("Hi, I'm Bob!")
})
