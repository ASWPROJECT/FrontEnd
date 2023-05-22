import React from 'react'
import '../assets/css/IssueStyle.css'

export const Issue = (props) => {
  const {id, subject, Description} = props;
  const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/'
  const base_url = 'http://localhost:3000'

  const deleteIssue = async () => {
    try {    
      const headers = {
        Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
        'Content-Type': 'application/json'
      };

      const response = await fetch(apiUrl + id + '/delete', {
        method: 'DELETE',
        headers,
      });

      console.log(response);

    } catch (error) {
      console.error('Error:', error);
    }
    window.location.href = base_url;
  };


  return (
    <div class="issues">
        <p class="title">{subject}</p>
        <p>{Description}</p>
        <button onClick={deleteIssue} class="taiga-btn-delete"></button>
    </div>
  )
}
