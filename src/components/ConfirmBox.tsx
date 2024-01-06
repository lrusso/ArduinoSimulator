import React from "react"

interface ConfirmBoxProps {
  title: string
  message: string
  accept: string
  acceptCallback: () => void
  cancel: string
  cancelCallback: () => void
}

const ConfirmBox = ({
  title,
  message,
  accept,
  acceptCallback,
  cancel,
  cancelCallback,
}: ConfirmBoxProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.title}>{title}</div>
        <div style={styles.message}>{message}</div>
        <div style={styles.buttonContainer}>
          <input
            type="button"
            style={styles.button}
            onClick={acceptCallback}
            value={accept}
          />
          <div style={styles.spacing}></div>
          <input
            type="button"
            style={styles.button}
            onClick={cancelCallback}
            value={cancel}
          />
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    minWidth: "320px",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "8888",
    backgroundColor: "rgba(0,0,0,0.5)",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  form: {
    position: "relative",
    top: "50%",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    transform: "translateY(-50%)",
    width: "300px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "0 2px 2px 1px rgba(0,0,0,0.4)",
  },
  title: {
    textAlign: "left",
    paddingLeft: "10px",
    backgroundColor: "#3a76b1",
    fontFamily: "Arial",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    lineHeight: "2.5",
    cursor: "default",
  },
  message: {
    marginLeft: "10px",
    marginRight: "10px",
    paddingTop: "20px",
    paddingBottom: "10px",
    fontFamily: "Arial",
    fontSize: "16px",
    fontWeight: "400",
    color: "black",
    overflow: "hidden",
    textAlign: "center",
    lineHeight: "2",
    cursor: "default",
    whiteSpace: "pre-wrap",
  },
  buttonContainer: {
    float: "left",
    width: "300px",
    textAlign: "center",
  },
  button: {
    outline: "none",
    padding: "10px",
    backgroundColor: "#d2d2d2",
    border: "1px solid #b2b2b2",
    fontFamily: "Arial",
    fontSize: "16px",
    color: "black",
    textAlign: "center",
    lineHeight: "1.5",
    display: "inline-block",
    marginBottom: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  spacing: {
    display: "inline-block",
    width: "20px",
    height: "40px",
  },
}

export default ConfirmBox
