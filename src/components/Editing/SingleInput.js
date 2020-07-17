import React from 'react'

const tdStyle = {
  padding: '3px',
  width: '50px'
}

const SingleInput = ({ element, idx, changeHandler, elementAdder }) => {
  return <span>
    <span onClick={(e) => elementAdder(e, idx, true)}>+</span>
    <input type="text"
      name={`elements-${idx}`}
      value={element}
      onChange={(e) => changeHandler(e, idx)}
      size="3"
      key={element}
      style={tdStyle}
      autoFocus
    />
  </span>
}

export default SingleInput