import React from 'react'

const tdStyle = {
  padding: '3px',
  width: '50px'
}

const SingleInput = ({ unit, idx, changeHandler }) => {
  return <span>
    <input type="text"
      name={`elements-${idx}`}
      value={unit}
      onChange={(e) => changeHandler(e, idx)}
      size="3"
      style={tdStyle}
      autoFocus
    />
  </span>
}

export default SingleInput