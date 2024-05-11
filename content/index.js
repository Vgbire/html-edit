function enableEdit(isEnable) {
  document.body.contentEditable = isEnable ? "true" : "false"
  document.designMode = isEnable ? "on" : "off"
}

function editStyle(styleChange) {
  if (styleChange) window.addEventListener("click", openStylePopup, true)
  else {
    if (
      window.getComputedStyle(document.querySelector("#html-edit__popup"))
        .display !== "none"
    )
      document.body.click()
    window.removeEventListener("click", openStylePopup, true)
  }
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
    document.querySelectorAll("*").forEach((item) => {
      item.style["user-select"] = "auto"
    })
}

chrome.storage.onChanged.addListener((changes) => {
  changes.editSwitch && enableEdit(changes.editSwitch.newValue)
  changes.styleSwitch && editStyle(changes.styleSwitch.newValue)
  changes.clickSwitch && clickIntercept(changes.clickSwitch.newValue)
  changes.darkSwitch && darkMode(changes.darkSwitch.newValue)
  changes.selectSwitch && selectMode(changes.selectSwitch.newValue)
})

let cookie = {}
let localStorageObj = {}
let sessionStorageObj = {}
// 清空本地存储的处理事件
chrome.runtime.onMessage.addListener(function (request) {
  const handleStorage = {
    clearCookie: () => {
      cookie = {}
      xCookie.keys().forEach((item) => {
        cookie[item] = xCookie.get(item)
      })
      xCookie.keys().forEach((item) => {
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
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var value = localStorage.getItem(key)
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
      for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i)
        var value = sessionStorage.getItem(key)
        sessionStorageObj[key] = value
      }
      sessionStorage.clear()
    },
    recoverSession: () => {
      Object.keys(sessionStorageObj).forEach((item) => {
        sessionStorage.setItem(item, sessionStorageObj[item])
      })
    },
  }
  handleStorage[request.type]()
})
