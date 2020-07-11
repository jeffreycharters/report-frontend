import React from 'react'
import dataUtils from '../../utils/dataUtils'

const Sample = ({ data, sigFigs, coloured }) => {

  return (
    <table className='sampleTable'>
      <tbody>
        <tr className={coloured ? 'colouredRow' : ''}>
          <td className='firstCol'>{data.id}</td>
          {data.values.map((v, i) => <td key={data.id + data.values[i]}>
            {v > 1000 ? parseFloat(dataUtils.roundToSigFigs(v, sigFigs)) : dataUtils.roundToSigFigs(v, sigFigs)}
          </td>)}
        </tr>
      </tbody>
    </table>
  )
}

export default Sample