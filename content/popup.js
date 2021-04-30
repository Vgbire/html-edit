const popup = document.createElement('div')
popup.id = "html-edit__popup"

styleList.forEach(item=>{
    const styleItem = document.createElement('div')
    styleItem.className = "style-item"
    const label = document.createElement('span')
    label.className = "label"
    label.textContent = item + "："
    const input = document.createElement('input')
    input.className = "input " + item
    styleItem.appendChild(label)
    styleItem.appendChild(input)
    popup.appendChild(styleItem)
})

popup.onmousedown = function(e) {
  if(e.target.tagName !== "INPUT"){
    let disX = 0
    let disY = 0
    disX = e.clientX - popup.offsetLeft
    disY = e.clientY - popup.offsetTop
    document.onmousemove = function(e) {	
      let l = e.clientX - disX
      let t = e.clientY - disY
      if (l < 0){
          l = 0
      } else if (l > document.documentElement.clientWidth - popup.offsetWidth){
          l = document.documentElement.clientWidth - popup.offsetWidth
      }
      if (t < 0){
          t = 0
      } else if (t > document.documentElement.clientHeight - popup.offsetHeight){
          t = document.documentElement.clientHeight - popup.offsetHeight
      }
      popup.style.top = t + "px"
      popup.style.left = l + "px"
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
    return false
  }
}

document.body.appendChild(popup)