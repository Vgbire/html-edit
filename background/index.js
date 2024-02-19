const operations = {
  editSwitch: false,
  styleSwitch: false,
  clickSwitch: false,
  darkSwitch: false,
  selectSwitch: false,
}

function changeStatus(key, value) {
  operations[key] = value
  sendMessageToContentScript()
}

function sendMessageToContentScript() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((item) => {
      chrome.tabs.sendMessage(item.id, operations)
    })
  })
}

chrome.runtime.onConnect.addListener(function (port) {
  port.postMessage(operations)
  port.onMessage.addListener(({ key, status }) => {
    changeStatus(key, status)
  })
})

chrome.runtime.onMessage.addListener(function () {
  sendMessageToContentScript()
})
