import React from "react"

interface BottomPanelProps {
  children: React.ReactNode
}

const BottomPanel = ({ children }: BottomPanelProps) => {
  return <div style={styles.container}>{children}</div>
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: "280px",
    borderTop: "1px solid #363636",
    backgroundColor: "#181818",
    borderLeft: "1px solid #363636",
    overflowX: "hidden",
  },
}

export default BottomPanel
