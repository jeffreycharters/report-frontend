import React from "react"
import ReactDOM from "react-dom"

import App from './App'
import './styles.css'

import CSVReader from "react-csv-reader";
import dataUtils from './utils/dataUtils'

const handleForce = (data) => {
  const parsedData = dataUtils.parseJsonData(data)
  ReactDOM.render(<div className='container'><App data={parsedData} /></div>, document.getElementById("root"));
}

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const reader = (
  <div className="container" style={{ textAlign: 'center', paddingTop: '40px', fontWeight: 'bold' }}>
    <CSVReader
      cssClass="react-csv-input"
      label="Select CHEM-162 LIMS Export of all samples"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
    <p>Built by JCQC</p>
  </div>
);

ReactDOM.render(reader, document.getElementById("root"));