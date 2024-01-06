import settings from "./service.json"

const BOARD_UNO = "UNO R3"
const BOARD_MEGA1280 = "MEGA 1280"
const BOARD_MEGA2560 = "MEGA 2560"
const BOARD_NANO = "NANO V3"

const getFallbackLanguage: () => string = () => {
  return settings.LANGUAGE_FALLBACK
}

export { BOARD_UNO, BOARD_MEGA1280, BOARD_MEGA2560, BOARD_NANO, getFallbackLanguage }
