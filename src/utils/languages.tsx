import languages from "./languages.json"
import { getFallbackLanguage } from "./service"

const serviceUserLanguage: string = window.navigator.language
  .substring(0, 2)
  .toLowerCase()

const serviceStrings: string =
  typeof languages[serviceUserLanguage] === "undefined"
    ? languages[getFallbackLanguage()]
    : languages[serviceUserLanguage]

const declareLanguageData: () => void = () => {
  global.SEARCH_FOR = t("SEARCH_FOR")
  global.ALL = t("ALL")
  global.REPLACE_WITH = t("REPLACE_WITH")
  global.REPLACE = t("REPLACE")
  global.SEARCH_OF = t("SEARCH_OF")
}

const t = (stringName: string) => {
  return serviceStrings[stringName] || ""
}
export { declareLanguageData, t }
