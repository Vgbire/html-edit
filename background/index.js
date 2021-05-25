window.allowEdit = false
window.styleEdit = false
window.clearClick = false

function changeStatus(key, value){
    window[key] = value
    sendMessageToContentScript()
}

function sendMessageToContentScript(){
    const options = { allowEdit: window.allowEdit, styleEdit: window.styleEdit, clearClick: window.clearClick }
	chrome.tabs.query({}, function(tabs){
        tabs.forEach(item => {
            chrome.tabs.sendMessage(item.id, options)
        })
	})
}

sendMessageToContentScript()

chrome.runtime.onMessage.addListener(function() {
    sendMessageToContentScript()
});