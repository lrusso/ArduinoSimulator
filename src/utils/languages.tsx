import languages from "./languages.json"
import { getFallbackLanguage } from "./service"

// eslint-disable-next-line no-unused-vars
type tType = (_value: string) => string
type declareLanguageDataType = () => void

const serviceUserLanguage: string = window.navigator.language
  .substring(0, 2)
  .toLowerCase()

const serviceStrings: string =
  typeof languages[serviceUserLanguage] === "undefined"
    ? languages[getFallbackLanguage()]
    : languages[serviceUserLanguage]

const declareLanguageData: declareLanguageDataType = () => {
  global.SEARCH_FOR = t("SEARCH_FOR")
  global.ALL = t("ALL")
  global.REPLACE_WITH = t("REPLACE_WITH")
  global.REPLACE = t("REPLACE")
  global.SEARCH_OF = t("SEARCH_OF")
}

const t: tType = (stringName: string) => {
  return serviceStrings[stringName] || ""
}
export { declareLanguageData, t }
