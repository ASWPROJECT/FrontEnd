import React from 'react'
import { Issue } from '../components/Issue.js';
import { useEffect, useState } from 'react';


export const IssuesView = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://issuetracker2-asw.herokuapp.com/issues', {
            mode: 'cors',
            headers: {
              'Origin': 'https://tu-dominio.com'
            }
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    
    }, [])
    
      if (!data) {
        return <div>Loading...</div>;
      }
    

  return (
    <div>
      {data.map(issue => (
        <Issue key={issue.id} subject={issue.Subject} Description={issue.Description} />
      ))}
    </div>
  )
}
