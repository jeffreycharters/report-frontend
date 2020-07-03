import React from 'react'
import { Helmet } from 'react-helmet'

import Blank from './Blank'
import Sample from './Sample'
import Duplicate from './Duplicate'
import Calibration from './Calibration'
import SampleHeader from './SampleHeader'
import HeaderInfo from './HeaderInfo'
import CheckStd from './CheckStd'
import ReferenceMaterial from './ReferenceMaterial'

const Report = ({ data, method }) => {

  const sampleIdRegEx = new RegExp('[0-9]{2}-[0-9]{6}-[0-9]{4}')

  return (
    <div className='container'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Agilent 7900 Reporting Application</title>
      </Helmet>

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
            method={method}
          />
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
                data={d}
                key={Date.now()}
                units={method.units} />

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

export default Report