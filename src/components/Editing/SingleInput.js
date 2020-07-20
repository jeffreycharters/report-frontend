import React from 'react'

const SingleInput = ({ element, idx, changeHandler, elementAdder }) => {
  return <span>
    <span className="insertSpan" onClick={() => elementAdder(idx, true)}>+</span>
    <input type="text"
      style={{ fontWeight: 'bold' }}
      name={`elements-${idx}`}
      value={element || ' '}
      onChange={(e) => changeHandler(e, idx)}
      size="2"
      autoFocus
    />
  </span >
}

export default SingleInput