import React from 'react'
import dataUtils from '../utils/dataUtils'

const QMS = ({ data, elements, sigFigs, units }) => {

  const rangesLow = [2.6, 0.7, 3.7, 0.9, 0.9, 0.1, 1.0, -Infinity]
  const rangesHigh = [3.1, 1.0, 4.2, 1.2, 1.2, 0.15, 1.7, Infinity]

  return (
    <div>
      <br />
      <table className='RMTable'>
        <thead>
          <tr>
            <th className='firstCol'>Sample Type</th>
            {elements.map((e, i) => <th key={e}>{e + ' (' + units[i] + ')'}</th>)}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='firstCol'>{data.id}</td>
            {data.values.map((v, i) => <td key={v + i}>{dataUtils.roundToSigFigs(v, sigFigs)}</td>)}
          </tr>
          <tr>
            <td className='firstCol'>Within Range</td>
            {data.values.map((v, i) => {
              const withinRange = (v > rangesLow[i] && v < rangesHigh[i])
              return <td className={withinRange ? 'samplePass' : 'sampleFail'} key={v + i}> {withinRange ? 'Yes' : 'No'}</td>
            })
            }
          </tr>
        </tbody>

      </table>
      <br />
    </div >
  )
}

export default QMS