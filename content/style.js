const currentTarget = {
  dom: null,
  style: null, // 是否在关闭style编辑时还原样式
  boxSizing: 'inherit',
  border: 'inherit',
}

let canBeClosed = true

function openStylePopup(e) {
  const popup = document.querySelector('#html-edit__popup')
  const popupComputedStyle = window.getComputedStyle(popup)
  const popupStyle = popup.style
  if (popupComputedStyle.display === 'none') {
    displayPopup(e, popup, popupStyle)
  } else if (popupComputedStyle.display !== 'none' && !popup.contains(e.target) && canBeClosed) {
    popupStyle.display = 'none'
    // 注释取消关闭编辑样式窗时样式还原
    // currentTarget.dom.style = currentTarget.style
    currentTarget.dom.style.boxSizing = currentTarget.boxSizing
    currentTarget.dom.style.border = currentTarget.border
  }
  canBeClosed = true
}

function displayPopup(e, popup, popupStyle) {
  const target = e.target
  const finalStyle = window.getComputedStyle(target)
  currentTarget.dom = target
  currentTarget.boxSizing = finalStyle.boxSizing
  currentTarget.border = finalStyle.border
  currentTarget.style = target.style
  target.style.border = '1px solid #000'
  target.style.boxSizing = 'border-box'
  if (finalStyle.display === 'inline') target.style.display = 'inline-block'

  const styleNames = document.querySelectorAll('.style-name')
  const styleValues = document.querySelectorAll('.style-value')

  styleValues.forEach((item, index) => {
    const style = styleNames[index].textContent || styleNames[index].value
    item.value = finalStyle[style]
    item.oninput = function () {
      currentTarget.dom.style[style] = item.value
    }
  })

  popupStyle.left = e.clientX + 'px'
  popupStyle.top = e.clientY + 'px'
  popupStyle.display = 'inline-block'
}
