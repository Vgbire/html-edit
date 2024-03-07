const camelizeRE = /-(\w)/g

const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

function init(dom, status) {
  dom.style.backgroundColor = status ? '#13ce66' : '#ff4949'
  dom.classList[status ? 'add' : 'remove']('is-allow')
}

chrome.storage.local.get().then((operations) => {
  const domId = [
    '#edit-switch',
    '#style-switch',
    '#click-switch',
    '#dark-switch',
    '#select-switch',
  ]

  const operateStatus = domId.map((item) => {
    const status = {}
    status.dom = document.querySelector(item)
    status.key = camelize(item.replace('#', ''))
    status.status = operations[status.key]
    return status
  })

  operateStatus.forEach((item) => {
    init(item.dom, item.status)
    item.dom.onclick = function () {
      item.status = !item.status
      init(item.dom, item.status)
      operations[item.key] = item.status
      chrome.storage.local.set(operations)
    }
  })
})
