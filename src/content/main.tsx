import { createRoot } from "react-dom/client"
import App from "./App"

const popup = document.createElement("div")
popup.id = "html-edit__popup"
document.body.appendChild(popup)

createRoot(document.getElementById("html-edit__popup")!).render(<App />)
