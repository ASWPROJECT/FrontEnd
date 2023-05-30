import React from 'react'
import '../assets/css/IssueStyle.css'

export const File = (props) => {
  const { comment, created_at, creator } = props;

  return (
    <div class="file">
        <ul>
            <p class="title">{comment}</p>
            <p>{creator}</p>
            <p>{created_at}</p>
        </ul>
    </div>
  )
}