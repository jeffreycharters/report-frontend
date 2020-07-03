import React from 'react'

const SampleHeader = ({ elements, units }) => {

  return (
    <>
      <br />
      <table className='sampleTable'>
        <thead>
          <tr>
            <th className='firstCol'>Sample ID</th>
            {elements.map((e, i) => <th key={e} >{e + ' (' + units[i] + ')'}</th>)}
          </tr>
        </thead>
      </table>
    </>
  )
}

export default SampleHeader