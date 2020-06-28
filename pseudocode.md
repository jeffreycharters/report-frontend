*CHEM-162 Data Analyser*

** Purpose **
To build a single page app that will allow user to upload a LIMS export file. The file will be parsed and organized, ultimately spitting out a report that can be printed and attached to the sequence worksheet. Report to include all necessary QC data to pass accreditation audits as well as concentration data for all elements.

** Required QC Parameters **
- Calibration curve: nominal concenration and instrument response; R value
- Check standards, expected and flags
- Blank concentration and flags if above MDL or LOQ
- Reference Material z-scores
- Duplicate results, filter to ensure > LOQ

-----

Printout of all concentration data for samples only.


-----

How to parse data:

- File is uploaded.

- Define method parameters, hardcoded at first: elements & names, units
- Use method parameters to read one line at a time and collect relevant info
- Parse calibration curves, add to calibration list. Each item in list is a dictionary with each element represented
- Make table for each element calibration curve

- Parse all remaining data into a list in order to preserve order
  - Each item in list is a dictionary, need to include ID, values and dup. Values and dup are lists

- Go through list of data, displaying it all and make components to display each type of data