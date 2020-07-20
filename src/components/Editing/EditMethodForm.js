import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import SingleInput from './SingleInput'
import UnitInput from './UnitInput'
import MethodObjectForm from './MethodObjectForm'
import ElementHeader from './ElementHeader'

const EditMethodForm = () => {

  const [method, setMethod] = useState()
  const methodName = useParams().name
  const history = useHistory()

  const baseUrl = '/api'

  useEffect(() => {
    axios.get(`${baseUrl}/methods`)
      .then(response => {
        setMethod(response.data.find(m => m.name === methodName))
      })
  }, [methodName])

  if (!method) {
    return 'Loading...'
  }

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
      if (Array.isArray(method[key]) && method[key].length > 0) {
        // If it's an array and not the calStandards array..
        // Added the key.name clause so it doesn't wipe things out when removing elements.
        if (method[key].length === startingElements && key !== 'calStandards' && !method[key][0].name) {
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

  const padding = {
    margin: '3px',
    padding: '3px'
  }

  const smallInput = {
    textAlign: 'center',
    border: '1px solid lightgrey',
    borderRadius: '6px',
    margin: '5px 0 5px 5px'
  }


  return <div className='centeredContainerParent' style={{ maxWidth: '98%' }}>
    <div className='centeredContainerChild' style={{ textAlign: 'left', paddingTop: '15px' }}>
      <form>

        <h1 style={{
          textAlign: 'center',
          border: '2px solid grey',
          padding: '5px',
          borderRadius: '6px',
        }}>
          Editing {method.name}
        </h1>

        <div className='editTitles'>

          <label htmlFor="name">Method Name<br /></label>
          <input type="text"
            name="name"
            value={method.name}
            onChange={methodChangeHandler}
            size="15"
          />

          <br />

          <label htmlFor="description">Method Description<br /></label>
          <input type="text"
            name="description"
            value={method.description}
            onChange={methodChangeHandler}
            size="70"
          />

        </div>

        <br />

        <label htmlFor="sigFigs">Sig Figs to Display</label>
        <input type="text"
          name="sigFigs"
          value={method.sigFigs}
          onChange={methodChangeHandler}
          size="1"
          style={smallInput}
        />

        <br />

        <label htmlFor="checkStdTolerance">Check Standards Tolerance</label>
        <input type="text"
          name="checkStdTolerance"
          value={method.checkStdTolerance * 100}
          onChange={(e) => {
            e.target.value /= 100
            methodChangeHandler(e)
          }}
          size="1"
          style={smallInput}
        />%


        <br />

        <label htmlFor="duplicateTolerance">Duplicate Tolerance</label>
        <input type="text"
          name="duplicateTolerance"
          value={method.duplicateTolerance}
          onChange={methodChangeHandler}
          size="1"
          style={smallInput}
        />%

        <div style={{ textAlign: 'right' }}>
          <h2>Add Something:</h2>

          <button onClick={addTypeHandler} name='checkStds' style={padding}>
            Add Check Standard
                </button>
          <button onClick={addTypeHandler} name='blanks' style={padding}>
            Add Blank
                </button>
          <button onClick={addTypeHandler} name='referenceMaterials' style={padding}>
            Add Reference Material
                </button>
        </div>
        <hr />


        <table
          cellSpacing='0'
          className='editMethodTable'>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}><h2>Elements</h2></th>
              {method.elements.map((element, idx) =>
                <th key={`${element}-${idx}`}>
                  <SingleInput
                    type='elements'
                    element={element}
                    changeHandler={methodElementChangeHandler}
                    elementAdder={newElementHandler}
                    idx={idx}
                  />
                </th>
              )}
              <td
                onClick={() => newElementHandler(method.elements.length, true)}
                style={{
                  textAlign: 'left',
                  fontSize: '0.55rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                +
                    </td>
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
              <td> </td>
            </tr>

            <ElementHeader elements={method.elements} title='Check Standards' />

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

            <ElementHeader elements={method.elements} title='Blanks' />

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

            <ElementHeader elements={method.elements} title='Reference Materials' />

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
              <td colSpan={method.elements.length + 2}>
                <hr /><br />
              </td>
            </tr>
            <tr>
              <td> </td>
              {method.elements.map((element, idx) => {
                if (method.elements.length < 2) {
                  return <td key={`remove-element-${element}-${idx}`}>
                    <button onClick={(e) => e.preventDefault()} style={{ color: 'grey' }}>
                      Remove<br />{element}
                    </button>
                  </td>
                }
                return <td key={`remove-element-${element}-${idx}`}>
                  <button onClick={() => newElementHandler(idx, false)} style={{ color: 'red' }}>
                    Remove<br />{element}
                  </button>
                </td>
              }
              )}
              <td> </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'inline', textAlign: 'right' }}>
            <button
              type="submit"
              onClick={saveChanges}
              style={{ margin: '15px', padding: '3px' }}
            >
              Save Changes
          </button>
          </div>
          <div style={{ display: 'inline', textAlign: 'left' }}>
            <button
              type="submit"
              onClick={() => history.push('/')}
              style={{ margin: '15px', padding: '3px' }}
            >
              Cancel and Leave
          </button>
          </div>
        </div>

      </form>
    </div >
  </div >
}

export default EditMethodForm