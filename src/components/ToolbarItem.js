import React from "react"

const ToolbarItem = ({ onClick, children }) => {
  return (
    <div style={styles.item}>
      <div
        style={styles.iconWrapper}
        onClick={onClick}
        className="arduinosimulator_menu_item"
      >
        {children}
      </div>
    </div>
  )
}

const styles = {
  item: {
    float: "left",
    display: "flex",
    margin: 0,
    height: "40px",
    alignItems: "center",
  },
  iconWrapper: {
    display: "block",
    fontFamily: "Arial",
    fontSize: "15px",
    lineHeight: "32px",
    height: "28px",
    width: "28px",
    backgroundColor: "#F2F2F2",
    border: "thin solid #F2F2F2",
    marginLeft: "3px",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    userSelect: "none",
    paddingTop: "3px",
    paddingBottom: "1px",
  },
}

export default ToolbarItem
