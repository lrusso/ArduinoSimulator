import React from "react"

interface PinsISRButton {
   isr_number: Number,
}

const SerialMonitorButton = ({
  isr_number
 }: PinsISRButton) => {
  return (
    <input
      type="submit"
      className="serial_send isr_button"
      value={`ISR ${isr_number}` }    
    />
  )
}

export default SerialMonitorButton
