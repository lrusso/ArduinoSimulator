import React from "react"
import Spinner from "./Spinner"

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <Spinner />
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    minWidth: "320px",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "8888",
  },
  icon: {
    position: "absolute",
    left: "0",
    top: "50%",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    width: "64px",
    height: "64px",
    transform: "translateY(-50%)",
  },
}

export default Loading
