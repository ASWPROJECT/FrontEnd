import React from 'react'
import { useState } from 'react';
import '../assets/css/bulkInsertStyle.css'


function str2JSON (str) {
  const subjects = str.split('\n').filter(subject => subject.trim() !== ''); // Divide el string en un array de sujetos y filtra las cadenas vacías
  const json = { subjects };
  return JSON.stringify(json);
}

export const BulkInsertView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/bulk-insert';

    const [subjects, setSubjects] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const handleSubjectsChange = (event) => {
        setSubjects(event.target.value);
    };

    const handleClick = async () => {
        try {    
          const headers = {
            Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
            'Content-Type': 'application/json'
          };
    
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: str2JSON(subjects)
          });
    
          if (response.ok) {
            setApiResponse('OK');
          } else {
            setApiResponse('Error');
          }
    
        } catch (error) {
          console.error('Error:', error);
        }

        setSubjects("")
      };

  return (
    <div>      
      <div id="msform">
        <h2 class="fs-title">New bulk insert</h2>          
        <textarea class="fs-textarea" name="issues" placeholder="One item per line..." style={{height: 200}} value={subjects} required onChange={handleSubjectsChange}/>
        <button onClick={handleClick}>Confirm</button>
      </div>
      <button class="close-button" onclick="">X</button>
    </div>
  )
}