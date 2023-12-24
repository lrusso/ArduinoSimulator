import React from "react"
import ReactDOM from "react-dom/client"
import { SimulatorContextProvider } from "./contexts/SimulatorContext"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <SimulatorContextProvider>
    <App />
  </SimulatorContextProvider>
)
