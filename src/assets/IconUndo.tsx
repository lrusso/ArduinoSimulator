import React from "react"

interface IconUndoProps {
  width: number
  height: number
}

const IconUndo = ({ width, height }: IconUndoProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 1000 1000">
      <path
        d="M762 -64q43 77 62 168t-9 168t-113.5 127.5t-253.5 46.5v-254l-384 384l384 384v-248q201 5 314.5 -73t148.5 -196t-4.5 -255.5t-144.5 -251.5z"
        transform="translate(0 930) scale(-1,1) rotate(180)"
      />
    </svg>
  )
}

export default IconUndo
