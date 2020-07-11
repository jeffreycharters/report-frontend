import React, { useState, useEffect } from 'react'
import axios from 'axios'

import MethodButtons from './components/MethodSelect'
import Report from './components/Report/index'
import Method from './components/Method'

import dataUtils from './utils/dataUtils'
import csvParse from './utils/csvParse'

const App = () => {
  const [error, setError] = useState(null)
  const [data, setData] = useState()
  const [method, setMethod] = useState({})
  const [methods, setMethods] = useState()

  const baseUrl = '/api'

  useEffect(() => {
    const allMethods = axios.get(`${baseUrl}/methods`)
    allMethods.then(response => setMethods(response.data))
  }, [])

  const fileHandler = (event) => {
    event.preventDefault()
    const inputFile = event.target.files[0]
    if (inputFile.type !== "text/plain") {
      console.log("wrong file type")
      setError("wrong file type")
      return
    }

    const reader = new FileReader()
    reader.readAsText(inputFile)
    reader.onloadend = () => {
      const jsonData = csvParse(reader.result)
      const parsedData = dataUtils.parseJsonData(jsonData)
      setData(parsedData)
    }
  }

  if (!methods) {
    return <div>Loading..</div>
  }
  else if (!data) {
    return <div className="container">
      <div>{error}</div>
      <MethodButtons methods={methods} setMethod={setMethod} />
      <div className='centeredContainerParent' style={{ height: '60px', padding: '25px' }}>
        <div className='centeredContainerChild'>
          {method.name && <input type="file" id="inputFile" name="inputFile" onChange={fileHandler} />}
        </div>
      </div>
      {method.name && <hr />}
      <Method method={method} />
    </div>
  } else {
    return <Report data={data} method={method} />
  }
}
export default App
