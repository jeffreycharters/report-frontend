import React, { useState } from 'react'

const SingleInput = ({ unit, idx, changeHandler }) => {
  const [value, setValue] = useState(unit)
  return <span>
    <input type="text"
      name={`elements-${idx}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => changeHandler(e, idx)}
      size="2"
    />
  </span>
}

export default SingleInput