import React from "react"

const ToolbarSeparator = () => {
  return <div style={styles.separator}></div>
}

const styles: { [key: string]: React.CSSProperties } = {
  separator: {
    float: "left",
    borderLeft: "thin solid #2B2B2B",
    marginLeft: "5px",
    height: "100px",
    width: "1px",
  },
}

export default ToolbarSeparator
