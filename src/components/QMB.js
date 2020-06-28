import React from 'react'
import dataUtils from '../utils/dataUtils'

const QMB = ({ data, elements, sigFigs, units }) => {

  const rangesLow = [-Infinity, -Infinity, -Infinity, -Infinity, -Infinity, 0.15, -Infinity, 0.10]
  const rangesHigh = [Infinity, Infinity, Infinity, Infinity, Infinity, 0.20, Infinity, 0.14]

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

export default QMB