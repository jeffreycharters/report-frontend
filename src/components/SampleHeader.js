import React from 'react'

const SampleHeader = ({ elements, units }) => {

  return (
    <div>
      <br />
      <table className='sampleTable'>
        <tbody>
          <tr>
            <th className='firstCol'>Sample Type</th>
            {elements.map((e, i) => <th key={e}>{e + ' (' + units[i] + ')'}</th>)}
          </tr>
        </tbody>
      </table>
    </div >
  )
}

export default SampleHeader