import React from 'react'

export const Issue = (props) => {
  const {subject, Description} = props;
  return (
    <div>
        <p>{subject}</p>
        <p>{Description}</p>
    </div>
  )
}
