import React, { useState } from 'react'
import SingleInput from './SingleInput'

const aMethod = {
  name: "CHEM-162",
  description: "Metals in Blood and Serum",
  elements: ["Mn", "Fe", "Co", "Cu", "Zn", "Se", "Mo", "Pb"],
  units: ["ppb", "ppm", "ppb", "ppm", "ppm", "ppm", "ppb", "ppm"],
  checkStds: [
    {
      name: '5/50 ppb',
      expectedValues: [5, 50, 5, 50, 50, 5, 5, 5],
      tolerance: 0.1
    }
  ],
  blanks: [
    {
      name: 'Serum Blank',
      type: 'serum',
      LOQs: [0.9, 0.013, 0.3, 0.0008, 0.0011, 0.007, 1, null]
    },
    {
      name: 'Blood Blank',
      type: 'blood',
      LOQs: [null, null, null, null, null, 0.029, null, 0.001]
    }
  ],
  duplicateTolerance: 15,
  calStandards: [0.05, 0.1, 0.25, 0.5, 1, 5, 10, 50, 250],
  sigFigs: 3,
  referenceMaterials: [{
    name: 'QM-S Q1807',
    rangesLow: [2.6, 0.7, 3.7, 0.9, 0.9, 0.1, 1.0, null],
    rangesHigh: [3.1, 1.0, 4.2, 1.2, 1.2, 0.15, 1.7, null]
  },
  {
    name: 'QM-B Q1720',
    rangesLow: [null, null, null, null, null, 0.15, null, 0.10],
    rangesHigh: [null, null, null, null, null, 0.20, null, 0.14]
  }]
}

const EditMethodForm = () => {

  const [method, setMethod] = useState(aMethod)

  const methodChangeHandler = (event) => {
    setMethod({
      ...method,
      [event.target.name]: event.target.value
    })
  }

  const methodElementChangeHandler = (event, idx) => {
    const updatedMethod = { ...method }
    updatedMethod.elements[idx] = event.target.value
    setMethod(updatedMethod)
  }

  const newElementHandler = (event, idx, add) => {
    const updatedMethod = { ...method }
    if (add) {
      updatedMethod.elements.splice(idx, 0, '')
    } else {
      updatedMethod.elements.splice(idx, 1)
    }
    setMethod(updatedMethod)
  }

  const saveChanges = event => {
    event.preventDefault()
    console.log('stuff to save:\n', method)
  }

  return <div>
    <form>
      <label htmlFor="name">Method Name</label>
      <input type="text"
        name="name"
        value={method.name}
        onChange={methodChangeHandler}
        size="10"
      />

      <br />

      <label htmlFor="description">Method Description</label>
      <input type="text"
        name="description"
        value={method.description}
        onChange={methodChangeHandler}
        size="75"
      />

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Elements by increasing mass:</th>
            {method.elements.map((element, idx) =>
              <th key={`${element}-${idx}`} style={{ backgroundColor: idx % 2 === 0 ? 'gainsboro' : '' }}>
                <SingleInput
                  element={element}
                  changeHandler={methodElementChangeHandler}
                  elementAdder={newElementHandler}
                  idx={idx} />
              </th>
            )}
            <th>
              <span onClick={(e) => newElementHandler(e, method.elements.length, true)}>+</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> </td>
            {method.elements.map((element, idx) =>
              <td key={`remove-element-${element}-${idx}`} style={{ backgroundColor: idx % 2 === 0 ? 'gainsboro' : '', textAlign: 'center' }}>
                <span onClick={(e) => newElementHandler(e, idx)}>
                  Remove
                </span>
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <hr />

      <button type="submit" onClick={saveChanges}>Save Changes</button>

    </form>
  </div >
}

export default EditMethodForm