import React from 'react'

const MethodSelect = ({ methods, setMethod }) => {
  return <div className='methodButtons'>
    {methods.map(m => {
      return <span key={m.name}><button className='methodButton' onClick={() => setMethod(m)}>{m.name}</button>{' '}</span>
    })
    }
  </div>
}

export default MethodSelect