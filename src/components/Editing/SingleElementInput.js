import React from 'react'

const tdStyle = {
  padding: '3px',
  width: '50px'
}

const SingleElementInput = ({ variable, idx, changeHandler }) => {
  return <span>
    <input type="text"
      name='units'
      value={variable}
      onChange={(e) => changeHandler(e, idx)}
      size="3"
      style={tdStyle}
      autoFocus
    />
  </span>
}

export default SingleElementInput