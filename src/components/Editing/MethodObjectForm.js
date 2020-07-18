import React, { useState } from 'react'

const NameInput = ({ object, idx, nameChangeHandler, type, arrayToDisplay }) => {
  const [value, setValue] = useState(object.name)
  return <td>
    {arrayToDisplay === 'rangesLow' ? null :
      <input
        type='text'
        id={`${type}~~${idx}`}
        value={value || ' '}
        onChange={(event) => setValue(event.target.value)}
        onBlur={nameChangeHandler}
        size="15"
      />}
    {arrayToDisplay === 'rangesHigh' ? 'High Cutoff' : null}
    {arrayToDisplay === 'rangesLow' ? 'Low Cutoff' : null}
    {arrayToDisplay === 'LOQs' ? 'LOQs' : null}
  </td>
}

const NumberInput = ({ Index, idx, object, numberChangeHandler, type, arrayToDisplay }) => {
  const [value, setValue] = useState(object || '')
  return <td>
    <input
      type='text'
      id={`${type}~~${Index}~~${arrayToDisplay}~~${idx}`}
      value={value || ' '}
      onChange={(event) => setValue(event.target.value)}
      onBlur={numberChangeHandler}
      size="2"
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
      {arrayToDisplay === 'rangesHigh' ? null : <button
        onClick={removeTypeHandler}
        id={`${type}-${idx}`}>
        Remove {object.name}</button>}
    </td>
  </tr>
}

export default MethodObjectForm