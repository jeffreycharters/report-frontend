import React, { useState } from 'react'

const SingleElementInput = ({ variable, idx, changeHandler }) => {
  const [value, setValue] = useState(variable)
  return <span>
    <input type="text"
      name='units'
      value={variable}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => changeHandler(e, idx)}
      size="2"
    />
  </span>
}

export default SingleElementInput