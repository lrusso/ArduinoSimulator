export interface Gpio {
  pinNumber: number
  isInput: boolean
  isEnabled: boolean
}

export interface Gpio_Analog {
  pinNumber: number
  isInput: boolean
  duty: number
}
