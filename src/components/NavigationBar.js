import React from 'react'
import '../assets/css/NavBarStyles.css'
import { Link, Outlet } from 'react-router-dom'

export const NavigationBar = () => {

  return (
    <div>
        <nav>
            <h1 class="app-title">Issue Tracker</h1>
            <ul>
              <li>
                <Link to="/">Issues</Link>
              </li>
              <li>
                <Link to="/activities">My Activities</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/edit_profile">Edit profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
        </nav>
        <hr />
        <Outlet/>
    </div>
  )
}
/*
<ul>
                <li><a href={{ base_url }}>Issues</a></li>
                <li><a href="{{ base_url }}/view_profile/">My Activities</a></li>
                <li><a href="{{ base_url }}/list_users/">Users</a></li>
                <li><a href="{{ base_url }}/user-settings/user-profile/">Edit profile</a></li>
                <li><a href="{% url 'logout' %}">Logout</a></li>
            </ul>
*/