import React from 'react'

const SingleInput = ({ element, idx, changeHandler, elementAdder, lastElement }) => {
  return <span>
    <span onClick={() => elementAdder(idx, true)}>+</span>
    <input type="text"
      name={`elements-${idx}`}
      value={element || ' '}
      onChange={(e) => changeHandler(e, idx)}
      size="2"
      key={element}
      autoFocus
    />
  </span>
}

export default SingleInput