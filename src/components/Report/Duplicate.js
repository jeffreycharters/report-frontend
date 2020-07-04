import React from 'react'
import dataUtils from '../../utils/dataUtils'

const Duplicate = ({ data, method }) => {
  const LOQs = method.blanks[0].LOQs
  const sigFigs = method.sigFigs

  return (
    <div>
      <br />
      <table className='RMTable'>
        <thead>
          <tr>
            <th className='firstCol'>Sample ID</th>
            {method.elements.map((e, i) =>
              <th key={e}>
                {e + ' (' + method.units[i] + ')'}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='firstCol'>{data.id}</td>
            {data.values.map(v =>
              <td key={v}>
                {v > 1000 ? parseFloat(dataUtils.roundToSigFigs(v, sigFigs)) : dataUtils.roundToSigFigs(v, sigFigs)}
              </td>
            )}
          </tr>

          <tr className='thickBottomBorder'>
            <td className='firstCol'>{data.id} DUP</td>
            {data.dupValues.map(v =>
              <td key={v}>
                {v > 1000 ? parseFloat(dataUtils.roundToSigFigs(v, sigFigs)) : dataUtils.roundToSigFigs(v, sigFigs)}
              </td>
            )}
          </tr>

          <tr>
            <td className='firstCol'>Average</td>
            {data.values.map((v, idx) => {
              const averageValue = (v + data.dupValues[idx]) / 2
              return <td key={v}>
                {v > 1000 ? parseFloat(dataUtils.roundToSigFigs(averageValue, sigFigs)) : dataUtils.roundToSigFigs(averageValue, sigFigs)}
              </td>
            }
            )}
          </tr>

          <tr>
            <td className='firstCol'>RPD (%)</td>
            {data.values.map((v, i) => {
              const average = ((v + data.dupValues[i]) / 2)
              const RPD = ((Math.abs(v - data.dupValues[i]) / average * 100).toFixed(1))
              const aboveLOQ = v > LOQs[i] && LOQs[i]
              return <td className={aboveLOQ ? RPD < method.duplicateTolerance ? 'samplePass' : 'sampleFail' : 'sampleNeutral'} key={v + i}>{RPD}</td>
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