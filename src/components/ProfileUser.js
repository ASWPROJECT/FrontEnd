import React from 'react'
import '../assets/css/ProfileStyle.css'

export const Profile = (props) => {
    const { username, email, first_name, last_name, bio, url, changeImage, changeBio} = props;
    console.log(props);

    const handleChangeImage = () => {
        changeImage(url);
    };

    const handleChangeBio = () => {
        changeBio(bio);
    };


    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Bio: {bio}</p>
            <p>URL: {url}</p>
        </div>
    )
}
