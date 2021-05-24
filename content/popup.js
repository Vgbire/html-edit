const popup = document.createElement('div')
popup.id = "html-edit__popup"

const styleList = ["width", "height", "font-size", "color"]

popup.addEventListener('mousedown',e=>{
  e.stopPropagation()
  canBeClosed = false
})

popup.addEventListener('mouseup',e=>{
  canBeClosed = false
})


styleList.forEach(item=>{
  const styleItem = document.createElement('div')
  styleItem.classList.add("style-item")
  const styleName = document.createElement('span')
  styleName.classList.add("style-name")
  styleName.textContent = item
  const span = document.createElement('span')
  span.textContent = "："
  const styleValue = document.createElement('input')
  styleValue.classList.add("style-value")
  styleItem.appendChild(styleName)
  styleItem.appendChild(span)
  styleItem.appendChild(styleValue)
  popup.appendChild(styleItem)
})

const addButton = document.createElement('span')
addButton.classList.add("add-style")
addButton.textContent = "+"
addButton.onclick = function(){
  const styleItem = document.createElement('div')
  styleItem.classList.add("style-item")
  const styleName = document.createElement('input')
  styleName.classList.add("style-name")
  const span = document.createElement('span')
  span.textContent = "："
  const styleValue = document.createElement('input')
  styleValue.classList.add("style-value")
  styleItem.appendChild(styleName)
  styleItem.appendChild(span)
  styleItem.appendChild(styleValue)
  let style
  popup.insertBefore(styleItem, addButton)
  styleName.oninput = function(){
    style = styleName.value
    styleValue.oninput = function(){
      currentTarget.dom.style[style] = styleValue.value
    }
  }
}

popup.appendChild(addButton)

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