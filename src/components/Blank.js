import React from 'react'
import dataUtils from '../utils/dataUtils'

const Blank = ({ data, elements, LOQs, sigFigs, units }) => {
  return (
    <div>
      <br />
      <table className='blankTable'>
        <thead>
          <tr>
            <th className='firstCol'>Sample Type</th>
            {elements.map((e, i) => <th key={e}>{e + ' (' + units[i] + ')'}</th>)}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='firstCol'>{data.id}</td>
            {data.values.map(v => <td key={v}>{dataUtils.roundToSigFigs(v, sigFigs)}</td>)}
          </tr>
          <tr>
            <td className='firstCol'>&lt; LOQ</td>
            {data.values.map((v, idx) => {
              const passes = v < LOQs[idx]
              return <td key={v} className={passes ? 'samplePass' : 'sampleFail'}>{passes ? 'Pass' : 'Fail'}</td>
            })
            }
          </tr>
        </tbody>
      </table>
    </div >
  )
}

export default Blank