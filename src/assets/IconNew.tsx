import React from "react"

interface IconNewProps {
  width: number
  height: number
}

const IconNew = ({ width, height }: IconNewProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 1000 1000">
      <path
        d="M903 761l-142 142q-24 24 -64 40.5t-73 16.5h-480q-33 0 -56.5 -23.5t-23.5 -56.5v-864q0 -33 23.5 -56.5t56.5 -23.5h736q33 0 56.5 23.5t23.5 56.5v608q0 33 -16.5 73t-40.5 64zM858 715q3 -2 5 -5l4 -6h-163v163l6 -4t5 -5zM896 16q0 -7 -4.5 -11.5t-11.5 -4.5h-736
    q-7 0 -11.5 4.5t-4.5 11.5v864q0 7 4.5 11.5t11.5 4.5h480q4 0 8 -0.5t8 -1.5v-254h254q1 -4 1.5 -8t0.5 -8v-608z"
        transform="translate(0 930) scale(-1,1) rotate(180)"
      />
    </svg>
  )
}

export default IconNew
