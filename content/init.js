function enableEdit(isEnable) {
  document.body.contentEditable = isEnable ? 'true' : 'false'
  document.designMode = isEnable ? 'on' : 'off'
}

function editStyle(styleChange) {
  if (styleChange) window.addEventListener('click', openStylePopup, true)
  else {
    if (window.getComputedStyle(document.querySelector('#html-edit__popup')).display !== 'none') document.body.click()
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
  document.querySelectorAll('*').forEach((item) => {
    item.style['user-select'] = open ? 'auto' : 'none'
  })
}

chrome.runtime.onMessage.addListener(function (options) {
  enableEdit(options.editSwitch)
  editStyle(options.styleSwitch)
  clickIntercept(options.clickSwitch)
  darkMode(options.darkSwitch)
  selectMode(options.selectSwitch)
})

chrome.runtime.sendMessage('init')
