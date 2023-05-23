import React from 'react'
import '../assets/css/userStyle.css'

export const User = (props) => {
  console.log(props);
  return (
    <div class="user">
      <img class="image" src={props.image_url}/>
      <p class="username">{props.username}</p>
    </div>
  )
}
