import React from 'react'
import { useEffect, useState } from 'react';


export const NewIssueView = () => {

    /*const [data, setData] = useState(null);

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
    
    }, [])*/
    

  return (
    <body>
    <div class = "lightbox">
        <form class = "lightbox-form" method="POST" action="https://issuetracker2-asw.herokuapp.com/issues">
        <h2 class="title">New Issue</h2>
        <div>
            <div class="form-wrapper">
            <div class="main">
                <fieldset>
                <input type="text" name="Subject" placeholder="Subject" required data-lenght="500"/>
                </fieldset>
                <fieldset>
                <textarea rows="7" name="Description" placeholder="Enter a description"></textarea>
                </fieldset>
            </div>
            </div>
            <div class="btn-container">
            <input type="submit" name="create" class="create action-button" value="Create"/>
            </div>
        </div>
        </form>
    </div>
    <button class="close-button" onclick="location.href='{{ base_url }}'">X</button>
    </body>
  )
}
