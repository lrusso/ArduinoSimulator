import React from "react"
import renderer from "react-test-renderer"
import languages from "../src/utils/languages.json"
import settings from "../src/utils/service.json"

describe("Language", () => {
  test("Checking the fallback language for missing strings", () => {
    let languageConflict = null

    Object.keys(languages).forEach((key) => {
      Object.keys(languages[key]).forEach((key2) => {
        if (languages[settings.LANGUAGE_FALLBACK][key2] === undefined) {
          languageConflict =
            settings.LANGUAGE_FALLBACK + " language is missing the string " + key2
        }
      })
    })

    expect(languageConflict).toBeNull()
  })

  test("Checking the other languages for missing strings", () => {
    let languageConflict = null

    Object.keys(languages[settings.LANGUAGE_FALLBACK]).forEach((keyOrig) => {
      Object.keys(languages).forEach((key) => {
        if (key === settings.LANGUAGE_FALLBACK) {
          return
        }
        Object.keys(languages[key]).forEach((key2) => {
          if (
            languages[settings.LANGUAGE_FALLBACK][key2] !== undefined &&
            languages[key][keyOrig] === undefined
          ) {
            languageConflict = key + " language is missing the string " + keyOrig
          }
        })
      })
    })

    expect(languageConflict).toBeNull()
  })

  test("Checking for empty strings", () => {
    let languageConflict = null

    Object.keys(languages).forEach((key) => {
      Object.keys(languages[key]).forEach((key2) => {
        if (languages[key][key2] === "") {
          languageConflict = key + " language - " + key2 + " value is empty"
        }
      })
    })

    expect(languageConflict).toBeNull()
  })

  test("Validating strings for possible changes", () => {
    let string_values = "\n"

    Object.keys(languages).forEach((key) => {
      Object.keys(languages[key]).forEach((key2) => {
        string_values = string_values + key + " - " + languages[key][key2] + "\n"
      })
    })

    const tree = renderer.create(<>{string_values}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
