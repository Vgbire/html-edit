const camelizeRE = /-(\w)/g
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

const background = chrome.extension.getBackgroundPage()

const domId = ['#edit-switch', '#style-switch', '#click-switch', '#dark-switch', '#select-switch']

const operateStatus = domId.map((item) => {
  const status = {}
  status.dom = document.querySelector(item)
  status.key = camelize(item.replace('#', ''))
  status.status = background[status.key]
  return status
})

operateStatus.forEach((item) => {
  init(item.dom, item.status)
  item.dom.onclick = function () {
    item.status = !item.status
    init(item.dom, item.status)
    background.changeStatus(item.key, item.status)
  }
})

function init(dom, status) {
  dom.style.backgroundColor = status ? '#13ce66' : '#ff4949'
  dom.classList[status ? 'add' : 'remove']('is-allow')
}

background.sendMessageToContentScript()
