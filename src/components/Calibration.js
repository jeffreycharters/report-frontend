import React from 'react'
import '../styles.css'

const Duplicate = ({ data, elements }) => {

  return (
    <div>
      <h1>Calibration Data</h1>

      <table className='calTable'>
        <thead>
          <tr>
            <th className='firstCol'>Concentration</th>
            {elements.map(e => <th key={e}>{e} (ppb)</th>)}
          </tr>
        </thead>

        <tbody>

          {data.map((std, i) => {
            return <tr key={std.id + i}>
              <td className='firstCol'>{std.id}</td>
              {std.values.map((v, i) => {
                if (std.id === '250 uog3' && v < 0.1) {
                  return <td className={i === 0 ? 'firstCol' : ''} key={v + i}> </td>
                }
                return <td key={v + i}>{v < 1 ? (v * 1000).toPrecision(4) : v.toPrecision(4)}</td>
              }
              )}
            </tr>
          })
          }

        </tbody>
      </table>
      <br />


      <h1>Sample Data</h1>
    </div >
  )
}

export default Duplicate