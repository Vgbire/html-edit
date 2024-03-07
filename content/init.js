function enableEdit(isEnable) {
  document.body.contentEditable = isEnable ? 'true' : 'false'
  document.designMode = isEnable ? 'on' : 'off'
}

function editStyle(styleChange) {
  if (styleChange) window.addEventListener('click', openStylePopup, true)
  else {
    if (
      window.getComputedStyle(document.querySelector('#html-edit__popup'))
        .display !== 'none'
    )
      document.body.click()
    window.removeEventListener('click', openStylePopup, true)
  }
}

function clickIntercept(removeClick) {
  if (removeClick) window.addEventListener('click', clickCallback, true)
  else window.removeEventListener('click', clickCallback, true)
}

function clickCallback(e) {
  if (e.target === document.querySelector('.add-style')) return
  e.preventDefault()
  e.stopPropagation()
}

function darkMode(open) {
  document.querySelector('html').style.filter = open ? 'invert(1)' : 'none'
}

function selectMode(open) {
  if (open)
    document.querySelectorAll('*').forEach((item) => {
      item.style['user-select'] = 'auto'
    })
}

chrome.storage.onChanged.addListener((changes) => {
  changes.editSwitch && enableEdit(changes.editSwitch.newValue)
  changes.styleSwitch && editStyle(changes.styleSwitch.newValue)
  changes.clickSwitch && clickIntercept(changes.clickSwitch.newValue)
  changes.darkSwitch && darkMode(changes.darkSwitch.newValue)
  changes.selectSwitch && selectMode(changes.selectSwitch.newValue)
})
