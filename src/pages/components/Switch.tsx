import React from "react"
import "./style.css"

interface IProps {
  value?: boolean
  onChange?: (value: boolean) => void
}
const Switch = (props: IProps) => {
  const { value, onChange } = props
  return (
    <span
      className={`switch ${value ? "is-active" : ""}`}
      style={{
        backgroundColor: value ? "#13ce66" : "#ff4949"
      }}
      onClick={() => {
        onChange?.(!value)
      }}></span>
  )
}

export default Switch
