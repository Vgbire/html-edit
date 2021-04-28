const background = chrome.extension.getBackgroundPage()

const editSwitch = document.querySelector('#edit-switch')
const styleSwitch = document.querySelector('#style-switch')
const clickSwitch = document.querySelector('#click-switch')
const operateStatus = [
    {dom: editSwitch, key: 'allowEdit', status: background.allowEdit},
    {dom: styleSwitch, key: 'styleEdit', status: background.styleEdit},
    {dom: clickSwitch, key: 'clearClick', status: background.clearClick}]

operateStatus.forEach(item => {
    init(item.dom, item.status)
    item.dom.onclick = function(){
        item.status = !item.status
        init(item.dom, item.status)
        background.changeStatus(item.key, item.status)
    }
})

function init(dom, status){
    dom.style.backgroundColor = status ? '#13ce66' : '#ff4949'
    dom.classList[status ? 'add' : 'remove']('is-allow')
}

background.sendMessageToContentScript()