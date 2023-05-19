import React from "react"

const ToolbarSeparator = () => {
  return <div style={styles.separator}></div>
}

const styles = {
  separator: {
    float: "left",
    borderLeft: "thin solid #D3D3D3",
    marginLeft: "5px",
    height: "100px",
    width: "1px",
  },
}

export default ToolbarSeparator
