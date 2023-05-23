import React from 'react'
import '../assets/css/NavBarStyles.css'

export const NavigationBar = () => {

    const base_url = 'https://issuetracker2-asw.herokuapp.com/issues/'

  return (
    <div>
        <nav>
            <h1 class="app-title">Issue Tracker</h1>
            <ul>
                <li><a href={{ base_url }}>Issues</a></li>
                <li><a href="{{ base_url }}/view_profile/">My Activities</a></li>
                <li><a href="{{ base_url }}/list_users/">Users</a></li>
                <li><a href="{{ base_url }}/user-settings/user-profile/">Edit profile</a></li>
                <li><a href="{% url 'logout' %}">Logout</a></li>
            </ul>
        </nav>
    </div>
  )
}