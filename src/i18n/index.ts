import i18n from "i18next"

const getLanguage = () => {
  const lng = navigator?.language || "en_US"
  if (lng.includes("zh")) {
    return "zh_CN"
  }
  if (lng.includes("en")) {
    return "en_US"
  }
  return "en_US"
}

i18n.init({
  lng: getLanguage(),
  resources: {
    zh_CN: {
      translation: {
        editMode: "编辑模式",
        styleAdjustment: "样式调整",
        disableClick: "禁用点击",
        darkMode: "黑夜模式",
        textSelection: "文字可选",
        clean: "清除",
        restore: "恢复",
        addStyle: "添加样式"
      }
    },
    en_US: {
      translation: {
        editMode: "Edit mode",
        styleAdjustment: "Style adjustment",
        disableClick: "Disable click",
        darkMode: "Dark mode",
        textSelection: "Text selection",
        clean: "Clean",
        restore: "Restore",
        addStyle: "Add style"
      }
    }
  }
})

export default i18n
