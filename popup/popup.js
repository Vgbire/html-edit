let enableEdit = false
const switchButton = document.querySelector('.switch')
switchButton.onclick = function(){
    enableEdit = !enableEdit
    switchButton.style.backgroundColor = enableEdit ? '#13ce66' : '#ff4949'
    switchButton.classList[enableEdit?'add':'remove']('is-allow')
}
