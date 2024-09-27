import { defineManifest } from "@crxjs/vite-plugin"
import packageJson from "./package.json"

const { name, version, description } = packageJson

export default defineManifest(async () => ({
  manifest_version: 3,
  name: name,
  version: version,
  description: description,
  icons: {
    "512": "public/edit.png"
  },
  action: {
    default_icon: "public/edit.png",
    default_title: name,
    default_popup: "index.html"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/main.tsx"],
      run_at: "document_end"
    }
  ],
  permissions: ["storage"]
}))
