import React from "react"
import IconBoard from "../assets/IconBoard"
import { BOARD_UNO } from "../utils/service"

const ToolbarBoard = ({ boardType, simulatorRunning }) => {
  return (
    <div style={styles.container}>
      <IconBoard width={28} height={28} enabled={!simulatorRunning} />
      <div style={{ color: simulatorRunning ? "#D3D3D3" : "#000", ...styles.label }}>
        {boardType ? boardType : BOARD_UNO}
      </div>
    </div>
  )
}

const styles = {
  container: {
    float: "left",
    display: "flex",
    margin: 0,
    height: "28px",
    paddingLeft: "5px",
    paddingRight: "5px",
    alignItems: "center",
  },
  label: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "13px",
    lineHeight: 2.7,
    marginLeft: "6px",
    marginRight: "0px",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    userSelect: "none",
  },
}

export default ToolbarBoard
