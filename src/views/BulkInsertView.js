import React from 'react'
import { useState } from 'react';


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
      };

  return (
        <div>
            <h2>Bulk Insert Issues</h2>
            <div>
                <div>
                    <p>Introduce each subject in a different line</p>
                </div>
                <div>
                    <textarea name="Subjects" placeholder="Subjects" value={subjects} required onChange={handleSubjectsChange}/>
                </div>
                
                <button onClick={handleClick}>Confirm</button>
                {apiResponse != "" && (
                    <div>
                        <p>Response: {apiResponse}</p>
                    </div>
                    )}
            </div>
        </div>
  )
}

function str2JSON (str) {
  const subjects = str.split('\n').filter(subject => subject.trim() !== ''); // Divide el string en un array de sujetos y filtra las cadenas vacías
  const json = { subjects };
  return JSON.stringify(json);
}