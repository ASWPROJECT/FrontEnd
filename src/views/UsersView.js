import React from 'react'
import { useEffect, useState } from 'react';
import { User } from '../components/User';
import { NavigationBar } from '../components/NavigationBar';


export const UsersView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/users/users/';
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

  return (
    <div>    
      <NavigationBar></NavigationBar>

      <div class="users">
        {Array.isArray(apiResponse) ? (
          apiResponse.map(user => (
            <User username={user.user_username} image_url={user.url}/>
          ))
        ) : (
          <p>No users</p>
        )}
      </div>
    </div>
  )
}