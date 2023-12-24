import React from "react"
import Editor from "./screens/Editor"
import { declareLanguageData } from "./utils/languages"

const App = () => {
  const [webLoaded, setWebLoaded] = React.useState(false)

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
