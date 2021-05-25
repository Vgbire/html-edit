function enableEdit(isEnable){
    document.body.contentEditable = isEnable ? 'true' : 'false'
    document.designMode=isEnable ? 'on' : 'off'
}

function editStyle(styleChange){
    if(styleChange) window.addEventListener('click', openStylePopup , true)
    else {
        if(window.getComputedStyle(document.querySelector("#html-edit__popup")).display !== "none")
            document.body.click()
        window.removeEventListener('click', openStylePopup, true)
    }
}

function clickIntercept(removeClick){
    if(removeClick) window.addEventListener('click', clickCallback , true)
    else window.removeEventListener('click', clickCallback, true)
}

function clickCallback(e){
    if(e.target === document.querySelector('.add-style')) return
    e.preventDefault()
    e.stopPropagation()
}

chrome.runtime.onMessage.addListener(function (options) {
    enableEdit(options.allowEdit)
    editStyle(options.styleEdit)
    clickIntercept(options.clearClick)
});

chrome.runtime.sendMessage('init');