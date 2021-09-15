const operationName = ['editSwitch', 'styleSwitch', 'clickSwitch', 'darkSwitch', 'selectSwitch']

operationName.forEach((item) => {
  window[item] = false
})

function changeStatus(key, value) {
  window[key] = value
  sendMessageToContentScript()
}

function sendMessageToContentScript() {
  const options = {}
  operationName.forEach((item) => {
    options[item] = window[item]
  })
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((item) => {
      chrome.tabs.sendMessage(item.id, options)
    })
  })
}

sendMessageToContentScript()

chrome.runtime.onMessage.addListener(function () {
  sendMessageToContentScript()
})
