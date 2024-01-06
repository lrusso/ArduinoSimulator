/* eslint-disable no-unused-vars */
import settings from "./service.json"

type getBoardsType = () => string[]
type isMegaType = (_value: string) => boolean
type isNanoType = (_value: string) => boolean

const getFallbackLanguage: () => string = () => {
  return settings.LANGUAGE_FALLBACK
}

const getBoards: getBoardsType = () => {
  return settings.BOARDS
}

const isMega: isMegaType = (boardType: string) => {
  if (!boardType) {
    return false
  } else if (boardType.toLocaleLowerCase().indexOf("mega") > -1) {
    return true
  }
  return false
}

const isNano: isNanoType = (boardType: string) => {
  if (!boardType) {
    return false
  } else if (boardType.toLocaleLowerCase().indexOf("nano") > -1) {
    return true
  }
  return false
}

export { getFallbackLanguage, getBoards, isMega, isNano }
