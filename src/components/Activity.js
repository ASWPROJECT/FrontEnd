import React from 'react'
import '../assets/css/activityStyle.css'

export const Activity = (props) => {
  console.log(props);
  return (
    <div class="card">
        <p>{props.creator}</p>
        <p>{props.created_at}</p>
        <p>{props.type}</p>
        <p>{props.user}</p>
    </div>
  )
}
