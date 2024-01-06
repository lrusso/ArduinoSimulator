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
    height: "251px",
    borderTop: "1px solid #D3D3D3",
    backgroundColor: "#F2F2F2",
    borderLeft: "1px solid #D3D3D3",
    overflowX: "hidden",
  },
}

export default BottomPanel
