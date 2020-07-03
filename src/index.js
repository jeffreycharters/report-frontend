import React from "react"
import ReactDOM from "react-dom"

import App from './App'
import './styles.css'

import dataUtils from './utils/dataUtils'

/* Uncomment for production - adds CSV part

import CSVReader from "react-csv-reader";

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

*/

//import jsonData from './data/output_good.json'
import jsonData from './data/outputBlood.json'

const parsedData = dataUtils.parseJsonData(jsonData)
ReactDOM.render(<div className='container'><App data={parsedData} /></div>, document.getElementById("root"));