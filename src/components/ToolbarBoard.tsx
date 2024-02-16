import React from "react"
import IconBoard from "../assets/IconBoard"
import { getBoards } from "../../src/utils/service"

interface ToolbarBoardProps {
  boardType: string
  simulatorRunning: boolean
}

const ToolbarBoard = ({ boardType, simulatorRunning }: ToolbarBoardProps) => {
  return (
    <div style={styles.container}>
      <IconBoard width={28} height={28} enabled={!simulatorRunning} />
      <div style={{ color: simulatorRunning ? "#363636" : "#000", ...styles.label }}>
        {boardType ? boardType : getBoards()[0]}
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
