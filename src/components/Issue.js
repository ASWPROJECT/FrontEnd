import React from 'react'
import '../assets/css/IssueStyle.css'
import { useNavigate } from 'react-router-dom';

export const Issue = (props) => {
  const { id, subject, Description, Blocked, onDelete } = props;
  const navigate = useNavigate();

  const handleDeleteIssue = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleClick = () => {
    navigate(`/issues/${id}`);  
  };

  return (
    <div class="issues" onClick={handleClick}>
        <p class="title">{subject}</p>
        <p>{Description}</p>
        <button onClick={handleDeleteIssue} class="taiga-btn-delete"></button>
        {Blocked != null ? <p>🔒︎</p> : null}
    </div>
  )
}
