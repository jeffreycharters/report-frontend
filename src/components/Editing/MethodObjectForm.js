import React, { useState } from 'react'

const NameInput = ({ object, idx, nameChangeHandler, type, arrayToDisplay }) => {
  const [value, setValue] = useState(object.name)
  return <td>
    <input
      id={`${type}~~${idx}`}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={nameChangeHandler}
      size="15"
    />
    {arrayToDisplay === 'rangesHigh' ? 'High Cutoff' : null}
    {arrayToDisplay === 'rangesLow' ? 'Low Cutoff' : null}
  </td>
}

const NumberInput = ({ Index, idx, object, numberChangeHandler, type, arrayToDisplay }) => {
  const [value, setValue] = useState(object || '')
  return <td>
    <input
      id={`${type}~~${Index}~~${arrayToDisplay}~~${idx}`}
      value={value || ''}
      onChange={(event) => setValue(event.target.value)}
      onBlur={numberChangeHandler}
      size="3"
    />
  </td>
}

const MethodObjectForm = ({ type,
  object,
  idx,
  arrayToDisplay,
  nameChangeHandler,
  numberChangeHandler,
  removeTypeHandler }) => {
  console.log(object)
  return <tr>
    <NameInput
      idx={idx}
      type={type}
      object={object}
      nameChangeHandler={nameChangeHandler}
      key={`${idx}-${object.name}`}
      arrayToDisplay={arrayToDisplay}
    />
    {object[arrayToDisplay].map((currentValue, i) =>
      <NumberInput
        Index={idx}
        idx={i}
        type={type}
        object={currentValue}
        numberChangeHandler={numberChangeHandler}
        key={`${currentValue}-${i}`}
        arrayToDisplay={arrayToDisplay}
      />
    )}
    <td>
      <button
        onClick={removeTypeHandler}
        id={`${type}-${idx}`}
      >Remove {object.name}</button>
    </td>
  </tr>
}

export default MethodObjectForm