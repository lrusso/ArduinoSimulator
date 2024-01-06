import React from "react"

interface IconSaveProps {
  width: number
  height: number
}

const IconSave = ({ width, height }: IconSaveProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 1000 1000">
      <path
        d="M896 960h-896v-1024h1024v896zM512 832h128v-256h-128v256zM896 64h-768v768h64v-320h576v320h75l53 -53v-715z"
        transform="translate(-10 930) scale(-1,1) rotate(180)"
      />
    </svg>
  )
}

export default IconSave
