import React from "react"
import Editor from "./screens/Editor"
import { declareLanguageData } from "./utils/languages"

import "./arduino-simulator.v1.0.0.css";

const App = () => {
  const [webLoaded, setWebLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    declareLanguageData()

    const checkAceEditor = setInterval(() => {
      if (global.ace) {
        setWebLoaded(true)
        clearInterval(checkAceEditor)
      }
    }, 200)
  }, [])

  if (!webLoaded) {
    return null
  }

  return <Editor />
}

export default App
