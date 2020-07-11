import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
import axios from 'axios'

import MethodSelect from './components/MethodSelect'
import Report from './components/Report/index'
import Method from './components/Method'

import FileSelector from './components/FileSelector'

const App = () => {
  const [error, setError] = useState(null)
  const [data, setData] = useState()
  const [method, setMethod] = useState()
  const [methods, setMethods] = useState()

  const baseUrl = '/api'

  useEffect(() => {
    const allMethods = axios.get(`${baseUrl}/methods`)
    allMethods.then(response => setMethods(response.data))
  }, [])

  return (
    <Router>
      <Switch>
        <Route path='/report'>
          <Report method={method} data={data} />
        </Route>
        <Route path='/:name'>
          <MethodSelect
            method={method}
            methods={methods}
            setMethod={setMethod}
            setError={setError}
            setData={setData} />
        </Route>
        <Route path='/'>
          <MethodSelect method={method} methods={methods} setMethod={setMethod} />
        </Route>
      </Switch>
    </Router>
  )

  /* 
  if (!methods) {
    return <div>Loading..</div>
  }

  else if (!data) {
    return <div className="container">
      {error && <div style={{ textAlign: 'center', height: '2rem', color: 'red' }}>{error}</div>}
      <MethodButtons methods={methods} setMethod={setMethod} />
      <FileSelector setError={setError} setData={setData} method={method} />
      {method.name && <hr />}
      <Method method={method} />
    </div>

  } else {

    return <div>
      <Report data={data} method={method} />
    </div>
  } */
}
export default App
