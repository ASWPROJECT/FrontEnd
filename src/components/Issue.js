import React from 'react'
import '../assets/css/IssueStyle.css'

export const Issue = (props) => {
  const { id, subject, Description, Blocked, onDelete } = props;
  // const deleteIssue = async () => {
  //   try {    
  //     const headers = {
  //       Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
  //       'Content-Type': 'application/json'
  //     };

  //     const response = await fetch(apiUrl + id + '/delete', {
  //       method: 'DELETE',
  //       headers,
  //     });

  //     console.log(response);

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  //   window.location.href = base_url;
  // };

  const handleDeleteIssue = () => {
    onDelete(id);
  };

  return (
    <div class="issues">
        <p class="title">{subject}</p>
        <p>{Description}</p>
        <button onClick={handleDeleteIssue} class="taiga-btn-delete"></button>
        {Blocked != null ? <p>🔒︎</p> : null}
    </div>
  )
}
