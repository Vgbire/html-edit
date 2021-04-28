const currentTarget = {
    dom: null,
    boxSizing: 'inherit',
    border: 'inherit'
}

function openStylePopup(e){
  const popup = document.querySelector("#html-edit__popup")
  const popupComputedStyle = window.getComputedStyle(popup)
  const popupStyle = popup.style
  if(popupComputedStyle.display === "none"){
      displayPopup(e, popup, popupStyle)
  } else if(popupComputedStyle.display !== "none" && !popup.contains(e.target)){
      popupStyle.display = "none"
      currentTarget.dom.style.boxSizing = currentTarget.boxSizing
      currentTarget.dom.style.border = currentTarget.border
  }
}

const styleList = ["width", "height", "fontSize", "color"]

function displayPopup(e, popup, popupStyle) {
    const target = e.target
    const finalStyle = window.getComputedStyle(target)
    currentTarget.dom = target
    currentTarget.boxSizing = finalStyle.boxSizing
    currentTarget.border = finalStyle.border
    target.style.border = "1px solid #000"
    target.style.boxSizing = "border-box"
    if(finalStyle.display === "inline") target.style.display = "inline-block"

    styleList.forEach(item => {
        const dom = popup.querySelector('.input.'+item)
        dom.value = finalStyle[item]
        dom.oninput = function(){
          currentTarget.dom.style[item] = dom.value
        }
    })
    popupStyle.left = e.clientX + "px"
    popupStyle.top = e.clientY + "px"
    popupStyle.display = "inline-block"
}