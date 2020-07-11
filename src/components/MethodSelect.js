import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import Method from './Method'
import FileSelector from './FileSelector'

const MethodSelect = ({ method, methods, setData, setError, setMethod }) => {

  const nameFromUrl = useParams().name
  useEffect(() => {
    if (nameFromUrl && methods) {
      setMethod(methods.find(m => m.name === nameFromUrl))
    }
  }, [methods, nameFromUrl, setMethod])

  if (!methods) {
    return <div>Loading...</div>
  }

  return <div className='methodButtons'>
    <div>
      <h1 style={{ textAlign: 'center' }}>JCQC Reporting Application</h1>
      <hr style={{ width: '36rem' }} />
    </div>
    <div style={{ padding: '15px 2px' }}>
      {methods.map(m => {
        return <span key={m.name}><Link to={`/${m.name}`} className='methodButton' onClick={() => setMethod(m)}>{m.name}</Link>{' '}</span>
      })
      }

      <Link to='/' className='methodButton' onClick={() => setMethod()}>Clear</Link>

      {method && (<div>
        <FileSelector setError={setError} method={method} setData={setData} />
        <Method method={method} />
      </div>)}
    </div>
  </div>
}

export default MethodSelect