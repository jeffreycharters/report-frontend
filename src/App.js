import React, { useEffect } from 'react'

import Blank from './components/Blank'
import QMS from './components/QMS'
import QMB from './components/QMB'
import Sample from './components/Sample'
import Duplicate from './components/Duplicate'
import Calibration from './components/Calibration'
import SampleHeader from './components/SampleHeader'
import HeaderInfo from './components/HeaderInfo'
import CCV from './components/CCV'

const App = ({ data }) => {

  useEffect(() => {
    document.title = 'CHEM-162 Reporting Summary'
  }, []);

  const elements = ["Mn", "Fe", "Co", "Cu", "Zn", "Se", "Mo", "Pb"]
  const units = ["ppb", "ppm", "ppb", "ppm", "ppm", "ppm", "ppb", "ppm"]
  const LOQs = [0.3, 0.0002, 0.4, 0.001, 0.0002, 0.0001, 0.3, 0.0003]
  const calStandards = [0, 0.05, 0.1, 0.25, 0.5, 1, 5, 10, 50, 250]
  const ccvValues = [5, 50, 5, 50, 50, 5, 5, 5]
  const sigFigs = 3

  const sampleRegEx = new RegExp('[0-9]{2}-[0-9]{6}-[0-9]{4}')

  return (
    <div>
      <HeaderInfo />
      {data[0].id && data.map((d, idx) => {
        if (d.id === 'Blank' && idx < 12) {
          const calData = data.slice(idx, idx + calStandards.length)
          return <Calibration
            data={calData}
            key={idx}
            elements={elements} />
        }
        if (d.id === 'Blank' && idx > 12) {
          return <Blank data={d}
            key={idx}
            LOQs={LOQs}
            elements={elements}
            sigFigs={sigFigs}
            units={units} />
        }
        else if (d.id === '5/50 ppb') {
          return <CCV
            data={d}
            key={idx}
            ccvValues={ccvValues}
            elements={elements}
            sigFigs={sigFigs} />
        }
        else if (d.id.includes('QM-S')) {
          return <QMS
            data={d}
            key={idx}
            elements={elements}
            sigFigs={sigFigs}
            units={units} />
        }
        else if (d.id.includes('QM-B')) {
          return <QMB
            data={d}
            key={idx}
            elements={elements}
            sigFigs={sigFigs}
            units={units} />
        }
        else if (d.id.match(sampleRegEx) && d.dupValues) {
          return <Duplicate
            data={d}
            key={idx}
            elements={elements}
            LOQs={LOQs}
            sigFigs={sigFigs}
            units={units} />
        }
        else if (d.id.match(sampleRegEx)) {
          if (data[idx - 1] && (!data[idx - 1].id.match(sampleRegEx) || data[idx - 1].dupValues)) {
            return (<div key={d.id + idx}>
              <SampleHeader
                elements={elements}
                key={Date.now()}
                units={units} />

              <Sample data={d}
                key={idx}
                sigFigs={sigFigs}
                coloured={idx % 2 === 1} /></div>)
          }
          return <Sample
            data={d}
            key={idx}
            sigFigs={sigFigs}
            coloured={idx % 2 === 1} />
        }
        return null
      })
      }
    </div>
  )

}

export default App;
