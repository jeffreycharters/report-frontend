import React, { useEffect } from 'react'

import Blank from './components/Blank'
import Sample from './components/Sample'
import Duplicate from './components/Duplicate'
import Calibration from './components/Calibration'
import SampleHeader from './components/SampleHeader'
import HeaderInfo from './components/HeaderInfo'
import CheckStd from './components/CheckStd'
import ReferenceMaterial from './components/ReferenceMaterial'

const App = ({ data }) => {

  useEffect(() => {
    document.title = 'CHEM-162 Reporting Summary'
  }, []);

  const method = {
    name: "CHEM-162 Minerals in Serum",
    elements: ["Mn", "Fe", "Co", "Cu", "Zn", "Se", "Mo", "Pb"],
    units: ["ppb", "ppm", "ppb", "ppm", "ppm", "ppm", "ppb", "ppm"],
    checkStds: [
      {
        name: '5/50 ppb',
        expectedValues: [5, 50, 5, 50, 50, 5, 5, 5],
        tolerance: 0.1
      }
    ],
    blanks: [
      {
        name: 'Serum Blank',
        LOQs: [0.9, 0.013, 0.3, 0.0008, 0.0011, 0.007, 1, null]
      },
      {
        name: 'Blood Blank',
        LOQs: [null, null, null, null, null, 0.029, null, 0.001]
      }
    ],
    duplicateTolerance: 15,
    calStandards: [5, 50, 5, 50, 50, 5, 5, 5],
    sigFigs: 3,
    referenceMaterials: [{
      name: 'QM-S Q1807',
      rangesLow: [2.6, 0.7, 3.7, 0.9, 0.9, 0.1, 1.0, null],
      rangesHigh: [3.1, 1.0, 4.2, 1.2, 1.2, 0.15, 1.7, null]
    },
    {
      name: 'QM-B Q1720',
      rangesLow: [null, null, null, null, null, 0.15, null, 0.10],
      rangesHigh: [null, null, null, null, null, 0.20, null, 0.14]
    }
    ]
  }

  const sampleIdRegEx = new RegExp('[0-9]{2}-[0-9]{6}-[0-9]{4}')

  return (
    <div>
      <HeaderInfo method={method} />
      {data[0].id && data.map((d, idx) => {

        const sampleBlank = method.blanks.find(b => b.name === d.id)
        const checkStd = method.checkStds.find(c => c.name === d.id)
        const referenceMaterial = method.referenceMaterials.find(r => r.name === d.id)
        const duplicate = d.id.match(sampleIdRegEx) && d.dupValues
        const sample = d.id.match(sampleIdRegEx)

        if (d.id === 'Cal Blank') {
          const calData = data.slice(idx, idx + method.calStandards.length)
          return <Calibration
            data={calData}
            key={idx}
            elements={method.elements} />
        }
        else if (sampleBlank) {
          return <Blank
            data={d}
            key={idx}
            blank={sampleBlank}
            method={method}
          />
        }
        else if (checkStd) {
          return <CheckStd
            data={d}
            key={idx}
            checkStd={checkStd}
            method={method}
          />
        }
        else if (referenceMaterial) {
          return <ReferenceMaterial
            data={d}
            key={idx}
            method={method}
            material={referenceMaterial}
          />
        }
        else if (duplicate) {
          return <Duplicate
            data={d}
            key={idx}
            method={method}
          />
        }
        else if (sample) {
          const prevSampleExists = data[idx - 1]
          const prevSampleIsSample = data[idx - 1].id.match(sampleIdRegEx)
          const prevSampleIsDup = data[idx - 1].dupValues
          if (prevSampleExists && (!prevSampleIsSample || prevSampleIsDup)) {
            return <div key={d.id + idx}>
              <SampleHeader
                elements={method.elements}
                key={Date.now()}
                units={d.units} />

              <Sample data={d}
                key={idx}
                sigFigs={method.sigFigs}
                coloured={idx % 2 === 1} />
            </div>
          }
          return <Sample
            data={d}
            key={idx}
            sigFigs={method.sigFigs}
            coloured={idx % 2 === 1} />
        }
        return null
      })
      }
    </div>
  )

}

export default App;
