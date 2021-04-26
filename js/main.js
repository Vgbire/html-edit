function enableEdit(isEnable){
    document.body.contentEditable = isEnable ? 'true' : 'false'
    document.designMode=isEnable ? 'on' : 'off'
}
function clickIntercept(removeClick){
    if(removeClick) window.addEventListener('click', clickCallback , true)
    else window.removeEventListener('click', clickCallback)
}
function clickCallback(e){ e.stopPropagation() }