import { useEffect, useRef, useState } from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Space } from "antd"
import { xCookie } from "../utils/cookie"
import "./style.css"
import i18n from "../i18n"
import { camelize } from "../utils"

function enableEdit(isEnable) {
  document.body.contentEditable = isEnable ? "true" : "false"
  document.designMode = isEnable ? "on" : "off"
}

function clickIntercept(removeClick) {
  if (removeClick) window.addEventListener("click", clickCallback, true)
  else window.removeEventListener("click", clickCallback, true)
}

function clickCallback(e) {
  if (e.target === document.querySelector(".add-style")) return
  e.preventDefault()
  e.stopPropagation()
}

function darkMode(open) {
  document.querySelector("html").style.filter = open ? "invert(1)" : "none"
}

function selectMode(open) {
  if (open)
    document.querySelectorAll("*").forEach((item: any) => {
      item.style["user-select"] = "auto"
    })
}

let cookie = {}
let localStorageObj = {}
let sessionStorageObj = {}

export default function App() {
  const styleContainer: any = useRef()
  const currentTarget = useRef({
    dom: null,
    style: null,
    boxSizing: "inherit",
    border: "inherit"
  })
  const [form] = Form.useForm()
  const styleList = ["width", "height", "font-size", "color"]
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ top: "0", left: "0" })

  const reset = () => {
    // 注释取消关闭编辑样式窗时样式还原
    // currentTarget.dom.style = currentTarget.style
    currentTarget.current.dom.style.boxSizing = currentTarget.current.boxSizing
    currentTarget.current.dom.style.border = currentTarget.current.border
    setShow(false)
  }

  useEffect(() => {
    const openStylePopup = (e) => {
      const show = !!styleContainer.current
      if (show === false && !styleContainer.current?.contains(e.target)) {
        const target = e.target
        const finalStyle = window.getComputedStyle(target)
        currentTarget.current = {
          dom: target,
          style: target.style,
          boxSizing: finalStyle.boxSizing,
          border: finalStyle.border
        }
        target.style.border = "1px dashed #000"
        target.style.boxSizing = "border-box"
        if (finalStyle.display === "inline")
          target.style.display = "inline-block"

        form.setFieldsValue({
          width: finalStyle.width,
          height: finalStyle.height,
          fontSize: finalStyle.fontSize,
          color: finalStyle.color,
          style: []
        })
        setPosition({ top: e.clientY + "px", left: e.clientX + "px" })
        setShow(true)
      } else if (show === true && !styleContainer.current.contains(e.target)) {
        reset()
      }
    }
    function editStyle(styleChange) {
      if (styleChange) window.addEventListener("click", openStylePopup, true)
      else {
        reset()
        window.removeEventListener("click", openStylePopup, true)
      }
    }
    const init = () => {
      chrome.storage.local.get().then((operations: any) => {
        if (operations.editSwitch) enableEdit(operations.editSwitch)
        if (operations.styleSwitch) editStyle(operations.styleSwitch)
        if (operations.clickSwitch) clickIntercept(operations.clickSwitch)
        if (operations.darkSwitch) darkMode(operations.darkSwitch)
        if (operations.selectSwitch) selectMode(operations.selectSwitch)
      })
    }
    init()
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        init()
      }
    })
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.editSwitch) enableEdit(changes.editSwitch.newValue)
      if (changes.styleSwitch) editStyle(changes.styleSwitch.newValue)
      if (changes.clickSwitch) clickIntercept(changes.clickSwitch.newValue)
      if (changes.darkSwitch) darkMode(changes.darkSwitch.newValue)
      if (changes.selectSwitch) selectMode(changes.selectSwitch.newValue)
    })
    // 清空本地存储的处理事件
    chrome.runtime.onMessage.addListener(function (request) {
      const handleStorage = {
        clearCookie: () => {
          cookie = {}
          xCookie.keys().forEach((item) => {
            cookie[item] = xCookie.get(item)
            xCookie.remove(item)
          })
        },
        recoverCookie: () => {
          Object.keys(cookie).forEach((item) => {
            xCookie.set(item, cookie[item], 9999999, "/")
          })
        },
        clearLocal: () => {
          localStorageObj = {}
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            const value = localStorage.getItem(key)
            localStorageObj[key] = value
          }
          localStorage.clear()
        },
        recoverLocal: () => {
          Object.keys(localStorageObj).forEach((item) => {
            localStorage.setItem(item, localStorageObj[item])
          })
        },
        clearSession: () => {
          sessionStorageObj = {}
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
            const value = sessionStorage.getItem(key)
            sessionStorageObj[key] = value
          }
          sessionStorage.clear()
        },
        recoverSession: () => {
          Object.keys(sessionStorageObj).forEach((item) => {
            sessionStorage.setItem(item, sessionStorageObj[item])
          })
        }
      }
      handleStorage[request.type]()
    })
  }, [])
  return (
    show && (
      <div
        ref={styleContainer}
        className="html-edit-style-container"
        style={{ top: position.top, left: position.left }}
        onMouseDown={(e) => {
          const popup = styleContainer.current
          let disX = 0
          let disY = 0
          disX = e.clientX - popup.offsetLeft
          disY = e.clientY - popup.offsetTop
          document.onmousemove = function (e) {
            let l = e.clientX - disX
            let t = e.clientY - disY
            if (l < 0) {
              l = 0
            } else if (
              l >
              document.documentElement.clientWidth - popup.offsetWidth
            ) {
              l = document.documentElement.clientWidth - popup.offsetWidth
            }
            if (t < 0) {
              t = 0
            } else if (
              t >
              document.documentElement.clientHeight - popup.offsetHeight
            ) {
              t = document.documentElement.clientHeight - popup.offsetHeight
            }
            setPosition({ top: t + "px", left: l + "px" })
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="right"
          onValuesChange={() => {
            const { width, height, fontSize, color, style } =
              form.getFieldsValue()
            currentTarget.current.dom.style.width = width
            currentTarget.current.dom.style.height = height
            currentTarget.current.dom.style.fontSize = fontSize
            currentTarget.current.dom.style.color = color

            style.forEach((item) => {
              const className = item.className?.trim()
              const value = item.value?.trim()
              if (className && value)
                currentTarget.current.dom.style[camelize(className)] = value
            })
          }}>
          {styleList.map((item) => {
            return (
              <Form.Item key={item} label={item} name={camelize(item)}>
                <Input />
              </Form.Item>
            )
          })}
          <Form.List name="style">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex" }} align="baseline">
                    <Form.Item {...restField} name={[name, "className"]}>
                      <Input placeholder="Style Name" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "value"]}>
                      <Input placeholder="Style Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({})}
                    block
                    icon={<PlusOutlined />}>
                    {i18n.t("addStyle")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    )
  )
}
