import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IssueDetail } from '../components/IssueDetail.js';


const BASE_URL = 'https://issuetracker2-asw.herokuapp.com'

export const IssueDetailView = () => {
    const [issue, setIssue] = useState('');
    const { id } = useParams();
    const SERVER_URL = `${BASE_URL}/issues/${id}`;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const headers = {
              Authorization: 'Token e91064dff956cb6b1cdf90f140b051d042d322c5',
              'Content-Type': 'application/json'
            };
    
            const response = await fetch(SERVER_URL, {
              method: 'GET',
              headers,
            });
    
            const responseData = await response.json();
            setIssue(responseData);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []); // La dependencia vacía [] asegura que el efecto solo se ejecute una vez al montar el componente

    return (
      <div>
        <IssueDetail issue={issue}/>
      </div>
    );
};
