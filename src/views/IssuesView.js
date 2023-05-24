import React, { useEffect, useState } from 'react';
import { Issue } from '../components/Issue.js';
import { NavigationBar } from '../components/NavigationBar.js';

export const IssuesView = () => {
  const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
  const [apiResponse, setApiResponse] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
          'Content-Type': 'application/json'
        };

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers,
        });

        const responseData = await response.json();
        setApiResponse(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // La dependencia vacía [] asegura que el efecto solo se ejecute una vez al montar el componente

  console.log(apiResponse);

  const deleteIssue = async (issueId) => {
    try {    
      const headers = {
        Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
        'Content-Type': 'application/json'
      };

      const response = await fetch(apiUrl + issueId + '/delete', {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        // Eliminación exitosa, actualiza el estado de apiResponse
        setApiResponse(prevState => prevState.filter(issue => issue.id !== issueId));
      } else {
        console.log('Error al eliminar el issue');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavigationBar></NavigationBar>

      {Array.isArray(apiResponse) ? (
        apiResponse.map(issue => (
          <Issue id={issue.id} subject={issue.Subject} Description={issue.Description} Blocked={issue.Block_reason} onDelete={deleteIssue}/>
        ))
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};
