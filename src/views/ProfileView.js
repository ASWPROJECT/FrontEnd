import { useState, useEffect } from "react";
import React from 'react'
import '../assets/css/registerStyle.css';
import { useParams } from 'react-router-dom';
import { ProfileReadOnly } from '../components/ProfileUserReadOnly.js';


export const ProfileView = () => {
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com'; 
    const { id } = useParams();
    const apiGetBioImageProfileUrl = `${apiUrl}/users/${id}`;
    const apiUserUrl = apiUrl+'/users/edit-user-profile/';
    console.log(apiGetBioImageProfileUrl)
    const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token'); // Obtener el token del local storage

        const fetchData = async () => {
          try {
            const headers = {
              Authorization: `Token ${token}`, // Incluir el token en el encabezado
              'Content-Type': 'application/json'
            };
        
            const responseUser = await fetch(apiUserUrl, {
              method: 'GET',
              headers,
            });
            const responseDataUser = await responseUser.json();
    
            const responseBio = await fetch(apiGetBioImageProfileUrl, {
              method: 'GET',
              headers,
            });
            const responseDataBio = await responseBio.json();
    
            setApiResponse({
              user: responseDataUser.user,
              profile: responseDataBio.profile,
            });
    
            console.log(responseDataUser);
            console.log(responseDataBio);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
    }, []);

              
    return (
        <div>
          {apiResponse.user && apiResponse.profile && (
            <ProfileReadOnly
              username={apiResponse.user.username}
              email={apiResponse.user.email}
              first_name={apiResponse.user.first_name}
              last_name={apiResponse.user.last_name}
              bio={apiResponse.profile.bio}
              url={apiResponse.profile.url}
            />
          )}
        </div>
    );
};
  