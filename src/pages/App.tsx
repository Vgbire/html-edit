import React, { useEffect, useState } from "react"
import "./style.css"
import { Button } from "antd"
import Switch from "./components/Switch"
import i18n from "../i18n"

export default function App() {
  const [form, setForm] = useState({
    editSwitch: false,
    styleSwitch: false,
    clickSwitch: false,
    darkSwitch: false,
    selectSwitch: false
  })

  useEffect(() => {
    chrome.storage.local.get().then((operations: any) => {
      setForm(operations)
    })
  }, [])

  const onChange = (type: string, checked: boolean) => {
    const data = { ...form, [type]: checked }
    setForm(data)
    chrome.storage.local.set(data)
  }

  const clearStorage = (key: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id
      chrome.tabs.sendMessage(tabId, { type: key })
    })
  }

  return (
    <div className="container">
      <div className="switch-item">
        <span className="label">{i18n.t("editMode")}：</span>
        <Switch
          value={form.editSwitch}
          onChange={(checked) => {
            onChange("editSwitch", checked)
          }}
        />
      </div>
      <div className="switch-item">
        <span className="label">{i18n.t("styleAdjustment")}：</span>
        <Switch
          value={form.styleSwitch}
          onChange={(checked) => {
            onChange("styleSwitch", checked)
          }}
        />
      </div>
      <div className="switch-item">
        <span className="label">{i18n.t("disableClick")}：</span>
        <Switch
          value={form.clickSwitch}
          onChange={(checked) => {
            onChange("clickSwitch", checked)
          }}
        />
      </div>
      <div className="switch-item">
        <span className="label">{i18n.t("darkMode")}：</span>
        <Switch
          value={form.darkSwitch}
          onChange={(checked) => {
            onChange("darkSwitch", checked)
          }}
        />
      </div>
      <div className="switch-item">
        <span className="label">{i18n.t("textSelection")}：</span>
        <Switch
          value={form.selectSwitch}
          onChange={(checked) => {
            onChange("selectSwitch", checked)
          }}
        />
      </div>
      <div className="switch-item">
        <span className="label">Cookie：</span>
        <Button
          size="small"
          style={{ marginRight: 5 }}
          onClick={() => {
            clearStorage("clearCookie")
          }}>
          {i18n.t("clean")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearStorage("recoverCookie")
          }}>
          {i18n.t("restore")}
        </Button>
      </div>
      <div className="switch-item">
        <span className="label">Local Storage：</span>
        <Button
          size="small"
          style={{ marginRight: 5 }}
          onClick={() => {
            clearStorage("clearLocal")
          }}>
          {i18n.t("clean")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearStorage("recoverLocal")
          }}>
          {i18n.t("restore")}
        </Button>
      </div>
      <div className="switch-item">
        <span className="label">Session Storage：</span>
        <Button
          size="small"
          style={{ marginRight: 5 }}
          onClick={() => {
            clearStorage("clearSession")
          }}>
          {i18n.t("clean")}
        </Button>
        <Button
          size="small"
          onClick={() => {
            clearStorage("recoverSession")
          }}>
          {i18n.t("restore")}
        </Button>
      </div>
    </div>
  )
}
