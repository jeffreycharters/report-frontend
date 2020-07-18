import React from 'react'

const tdStyle = {
  padding: '3px',
  width: '50px'
}

const SingleInput = ({ element, idx, changeHandler, elementAdder, lastElement }) => {
  return <span>
    <span onClick={() => elementAdder(idx, true)}>+</span>
    <input type="text"
      name={`elements-${idx}`}
      value={element}
      onChange={(e) => changeHandler(e, idx)}
      size="3"
      key={element}
      style={tdStyle}
      autoFocus
    />
    {lastElement &&
      <span
        onClick={(e) => elementAdder(idx + 1, true)}>+</span>}
  </span>
}

export default SingleInput