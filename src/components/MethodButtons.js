import React from 'react'

const MethodButtons = ({ methods, setMethod }) => {
  return <div>
    {methods.map(m => {
      return <span key={m.name}><button onClick={() => setMethod(m)}>{m.name}</button>{' '}</span>
    })
    }
  </div>
}

export default MethodButtons