export interface Gpio {
  pinNumber: number
  isInput: boolean
  isEnabled: boolean
}

export interface Gpio_analog {
  pinNumber: number
  isInput: boolean
  duty: number
}
