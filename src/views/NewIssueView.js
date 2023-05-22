import React from 'react'
import { useEffect, useState } from 'react';


export const NewIssueView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';


    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleClick = async () => {
        try {    
          const headers = {
            Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
            'Content-Type': 'application/json'
          };
    
          const data = {
            Subject: subject,
            Description: description
          };
    
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
    
          const responseData = await response.json();
          setApiResponse(responseData)
    
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
        <div>
            <h2 class="title">New Issue</h2>
            <div>
                <div>
                    <input type="text" name="Subject" placeholder="Subject" value={subject} required data-lenght="500" onChange={handleSubjectChange}/>
                </div>
                <div>
                    <textarea rows="7" name="Description" placeholder="Enter a description" value={description} onChange={handleDescriptionChange}></textarea>
                </div>
                <button onClick={handleClick}>Create</button>
                <div>
                    {apiResponse && (
                    <div>
                        <p>ID: {apiResponse.id}</p>
                        <p>Subject: {apiResponse.Subject}</p>
                        <p>Description: {apiResponse.Description}</p>
                        {/* Muestra las propiedades del objeto apiResponse */}
                    </div>
                    )}
                </div>
            </div>
        </div>
  )
}