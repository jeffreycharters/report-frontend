import React, { useState } from 'react'
import SingleInput from './SingleInput'
import UnitInput from './UnitInput'
import MethodObjectForm from './MethodObjectForm'

const aMethod = {
  name: "CHEM-162",
  description: "Metals in Blood and Serum",
  elements: ["Mn", "Fe", "Co", "Cu", "Zn", "Se", "Mo", "Pb"],
  units: ["ppb", "ppm", "ppb", "ppm", "ppm", "ppm", "ppb", "ppm"],
  checkStds: [
    {
      name: '5/50 ppb',
      expectedValues: [5, 50, 5, 50, 50, 5, 5, 5]
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
  checkStdTolerance: 0.1,
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

  const blankArray = ["LOQs"]
  const checkStdsArray = ["expectedValues"]
  const referenceMaterialsArray = ["rangesHigh", "rangesLow"]

  const methodElementChangeHandler = (event, idx) => {
    const updatedMethod = { ...method }
    updatedMethod.elements[idx] = event.target.value
    setMethod(updatedMethod)
  }

  const methodUnitChangeHandler = (event, idx) => {
    const updatedMethod = { ...method }
    updatedMethod.units[idx] = event.target.value
    setMethod(updatedMethod)
  }

  const newElementHandler = (idx, add = false) => {
    const updatedMethod = { ...method }

    const modifyArray = (array, idx, add, toAdd = null) => {
      if (add) {
        array.splice(idx, 0, toAdd)
      } else {
        array.splice(idx, 1)
      }
    }

    // This next bit looks through the method object for arrays
    // the same length as the list of elements, which we can then
    // lengthen or shorten to add an element.
    const keys = Object.keys(method);
    const startingElements = method.elements.length

    // Loop through each key of the method object.
    for (const key of keys) {
      // Check if it's an array.
      if (Array.isArray(method[key])) {
        // If it's an array and not the calStandards array..
        if (method[key].length === startingElements && key !== 'calStandards') {
          // Add or remove a value using this function.
          modifyArray(updatedMethod[key], idx, add, '')

        }
        // If the key holds an object and it has a name key...
        else if (typeof method[key] === 'object' && method[key][0].name) {
          // Cycle through the list looking at each sub-object.
          for (let i = 0; i < method[key].length; i++) {

            const nestedKeys = Object.keys(method[key][i]);
            for (const nestedKey of nestedKeys) {
              const thisItem = method[key][i][nestedKey];
              // If the key holds an array of the right length,
              // we'll add or remove an item in the right spot.
              if (Array.isArray(thisItem) && thisItem.length === startingElements) {
                modifyArray(thisItem, idx, add, null)
              }
            }
          }
        }
      }
    }
    setMethod(updatedMethod)
  }

  const inputNumberChangeHandler = (event) => {
    const [type, typeIndex, keyName, finalIndex] = event.target.id.split('~~')
    console.log(event.target.id)
    const updatedMethod = { ...method }
    updatedMethod[type][typeIndex][keyName][finalIndex] = event.target.value
    setMethod(updatedMethod)
  }

  const inputNameChangeHandler = (event) => {
    const [type, index] = event.target.id.split('~~')
    const updatedMethod = { ...method }
    updatedMethod[type][index].name = event.target.value
    setMethod(updatedMethod)
  }

  const saveChanges = event => {
    event.preventDefault()
    console.log('stuff to save:\n', method)
  }

  const addTypeHandler = (event) => {
    event.preventDefault()
    const type = event.target.name
    const blankArray = Array(method.elements.length).join('.').split('.')
    const updatedMethod = { ...method }
    switch (type) {
      case 'blanks':
        const newBlank = {
          type: '',
          name: 'New Blank',
          LOQs: blankArray
        }
        updatedMethod[type].push(newBlank)
        setMethod(updatedMethod)
        break
      case 'checkStds':
        const newCheckStd = {
          name: 'New Check Standard',
          expectedValues: blankArray
        }
        updatedMethod[type].push(newCheckStd)
        setMethod(updatedMethod)
        break
      case 'referenceMaterials':
        const secondBlankArray = Array(method.elements.length).join('.').split('.')
        const newReferenceMaterial = {
          name: 'New Ref Material',
          rangesLow: blankArray,
          rangesHigh: secondBlankArray
        }
        updatedMethod[type].push(newReferenceMaterial)
        setMethod(updatedMethod)
        break
      default:
        console.log(`Something went wrong adding new ${event.target.name}`)
        break
    }
  }

  const removeTypeHandler = (event) => {
    event.preventDefault()
    const [type, idx] = event.target.id.split('-')
    const updatedMethod = { ...method }
    updatedMethod[type].splice(idx, 1)
    setMethod(updatedMethod)
  }

  return <div>
    <form>
      <label htmlFor="name">Method Name</label>
      <input type="text"
        name="name"
        value={method.name}
        onChange={methodChangeHandler}
        size="15"
      />

      <br />

      <label htmlFor="description">Method Description</label>
      <input type="text"
        name="description"
        value={method.description}
        onChange={methodChangeHandler}
        size="75"
      />

      <h2>Elements</h2>

      <table style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            {method.elements.map((element, idx) =>
              <th key={`${element}-${idx}`}>
                <SingleInput
                  type='elements'
                  element={element}
                  changeHandler={methodElementChangeHandler}
                  elementAdder={newElementHandler}
                  idx={idx}
                  lastElement={idx + 1 === method.elements.length} />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'right' }}>Units</td>
            {method.units.map((unit, idx) =>
              <td
                key={`${method.elements[idx]}-${unit}-${idx}`}>
                <UnitInput
                  unit={unit}
                  idx={idx}
                  changeHandler={methodUnitChangeHandler}
                />
              </td>
            )}
          </tr>


          <tr>
            <td colSpan={method.elements.length}>

              <h2>Check Standards</h2>

            </td>
          </tr>

          {method.checkStds.map((object, index) =>
            checkStdsArray.map(arrayToDisplay =>
              <MethodObjectForm
                object={object}
                idx={index}
                nameChangeHandler={inputNameChangeHandler}
                numberChangeHandler={inputNumberChangeHandler}
                removeTypeHandler={removeTypeHandler}
                type='checkStds'
                arrayToDisplay={arrayToDisplay}
                key={object.name}
              />
            )
          )}

          <tr>
            <td colSpan={method.elements.length} style={{ textAlign: 'right' }}>
              <button onClick={addTypeHandler} name='checkStds'>
                Add Check Standard
                </button>
            </td>
          </tr>


          <tr>
            <td colSpan={method.elements.length}>

              <h2>Blanks</h2>

            </td>
          </tr>

          {method.blanks.map((blank, blankIndex) =>
            blankArray.map(arrayToDisplay =>
              <MethodObjectForm
                object={blank}
                idx={blankIndex}
                nameChangeHandler={inputNameChangeHandler}
                numberChangeHandler={inputNumberChangeHandler}
                removeTypeHandler={removeTypeHandler}
                type='blanks'
                arrayToDisplay={arrayToDisplay}
                key={blank.name}
              />
            )
          )}


          <tr>
            <td colSpan={method.elements.length} style={{ textAlign: 'right' }}>
              <button onClick={addTypeHandler} name='blanks'>
                Add Blank
                </button>
            </td>
          </tr>



          <tr>
            <td colSpan={method.elements.length}>

              <h2>Reference Materials</h2>

            </td>
          </tr>

          {method.referenceMaterials.map((object, index) =>
            referenceMaterialsArray.map(arrayToDisplay =>
              <MethodObjectForm
                object={object}
                idx={index}
                nameChangeHandler={inputNameChangeHandler}
                numberChangeHandler={inputNumberChangeHandler}
                removeTypeHandler={removeTypeHandler}
                type='referenceMaterials'
                arrayToDisplay={arrayToDisplay}
                key={`${object.name}=${arrayToDisplay}`}
              />
            )
          )}

          <tr>
            <td colSpan={method.elements.length} style={{ textAlign: 'right' }}>
              <button onClick={addTypeHandler} name='referenceMaterials'>
                Add Reference Materials
                </button>
            </td>
          </tr>


          <tr>
            <td> </td>
            {method.elements.map((element, idx) =>
              <td key={`remove-element-${element}-${idx}`}>
                <span onClick={() => newElementHandler(idx, false)} style={{ color: 'red' }}>
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