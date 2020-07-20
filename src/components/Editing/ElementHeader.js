import React from 'react'

const ElementHeader = ({ elements, title }) => {
  return <tr className='greyTopBorder'>

    <td style={{ textAlign: 'left', verticalAlign: 'bottom' }}>
      <h2>{title}</h2>
    </td>

    {elements.map(element =>
      <td
        style={{ fontWeight: 'bold' }}
        key={element}>
        {element}
      </td>
    )}
    <td> </td>
  </tr>
}

export default ElementHeader