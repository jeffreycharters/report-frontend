import React from 'react'
import dataUtils from '../utils/dataUtils'

const Duplicate = ({ data, elements, LOQs, sigFigs, units }) => {

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
            {data.values.map(v => <td key={v}>{dataUtils.roundToSigFigs(v, sigFigs)}</td>)}
          </tr>

          <tr className='thickBottomBorder'>
            <td className='firstCol'>{data.id} DUP</td>
            {data.dupValues.map(v => <td key={v}>{dataUtils.roundToSigFigs(v, sigFigs)}</td>)}
          </tr>

          <tr>
            <td className='firstCol'>Average</td>
            {data.values.map((v, idx) => <td key={v}>{dataUtils.roundToSigFigs(((v + data.dupValues[idx]) / 2), sigFigs)}</td>)}
          </tr>

          <tr>
            <td className='firstCol'>RPD (%)</td>
            {data.values.map((v, i) => {
              const average = ((v + data.dupValues[i]) / 2)
              const RPD = ((Math.abs(v - data.dupValues[i]) / average * 100).toFixed(1))
              const aboveLOQ = v > LOQs[i]
              return <td className={aboveLOQ ? RPD < 15 ? 'samplePass' : 'sampleFail' : 'sampleNeutral'} key={v + i}>{RPD}</td>
            })
            }
          </tr>
        </tbody>

      </table>
      <br />
    </div >
  )
}

export default Duplicate