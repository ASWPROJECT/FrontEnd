import React from 'react'
import '../assets/css/IssueStyle.css'

export const Issue = (props) => {
  const {subject, Description} = props;
  return (
    <div class="issue-card">
        <p class="title">{subject}</p>
        <p>{Description}</p>
    </div>
  )
}
