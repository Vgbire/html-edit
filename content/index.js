function enableEdit(isEnable){
    document.body.contentEditable = isEnable ? 'true' : 'false'
    document.designMode=isEnable ? 'on' : 'off'
}

function clickIntercept(removeClick){
    if(removeClick) window.addEventListener('click', clickCallback , true)
    else window.removeEventListener('click', clickCallback, true)
}

function clickCallback(e){
    e.preventDefault()
    e.stopPropagation()
}

chrome.runtime.onMessage.addListener(function (options) {
    enableEdit(options.allowEdit)
    clickIntercept(options.clearClick)
});

chrome.runtime.sendMessage('init');