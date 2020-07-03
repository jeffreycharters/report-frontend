import React, { useState, useEffect } from 'react'
import CSVReader from 'react-csv-reader'
import axios from 'axios'

import MethodButtons from './components/MethodButtons'
import Report from './components/Report/index'
import Method from './components/Method'

import dataUtils from './utils/dataUtils'

const App = () => {
  const [data, setData] = useState();
  const [method, setMethod] = useState({});
  const [methods, setMethods] = useState();

  const baseUrl = '/api'

  useEffect(() => {
    const allMethods = axios.get(`${baseUrl}/methods`)
    allMethods.then(response => setMethods(response.data))
  }, [])

  const csvHandler = (data) => {
    setData(dataUtils.parseJsonData(data))
    return <App />
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };


  const Reader = () => {
    return (
      <div style={{ textAlign: 'center', paddingTop: '40px', fontWeight: 'bold' }}>
        <CSVReader
          cssClass="react-csv-input"
          label="Select a method using buttons above, then choose your file."
          onFileLoaded={csvHandler}
          parserOptions={papaparseOptions}
          inputStyle={{ disabled: 'true' }}
        />
      </div>
    )
  }

  if (!methods) {
    return <div>Loading..</div>
  }
  else if (!data) {
    return <div className="container">
      <MethodButtons methods={methods} setMethod={setMethod} />
      <Reader />
      {method.name && <hr />}
      <Method method={method} />
    </div>
  } else {
    return <Report data={data} method={method} />
  }
}
export default App
