import React, { useEffect, useState } from 'react';
import { Issue } from '../components/Issue.js';
import { NavigationBar } from '../components/NavigationBar.js';
import '../assets/css/IssuesViewStyles.css'

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
    <div class="WNDW">
      <NavigationBar></NavigationBar>
      <div class="taskboard-actions">
        <div class="issue-table-options">
          <div class="filter-form" >
            <input class="search-bar" type="text" name="q" placeholder="subject or description" autocomplete="on" ></input>

            <label class="search-bar" for="status">Status:</label>
            <select class="select-filters" id="status" name="status">                
                <option value="" ></option>
                <option value="New">New</option>
                <option value="In progress">In progress</option>
                <option value="Ready for test">Ready for test</option>
                <option value="Closed">Closed</option>
                <option value="Needs info">Needs info</option>
                <option value="Rejected">Rejected</option>
                <option value="Postponed">Postponed</option>
            </select>

            <label class="search-bar" for="priority">Priority:</label>
            <select class="select-filters" id="priority" name="priority">
                <option value="" ></option>
                <option value="Low" >Low</option>
                <option value="Normal" >Normal</option>
                <option value="High">High</option>
            </select>

            <label class="search-bar" for="creator">Created by:</label>
            <select class="select-filters" id="creator" name="creator">
              <option value="" ></option>
              {/* PARA CADA USUARIO */}
              <option value="USERNAME"></option>
            </select>

            <label class="search-bar" for="order_by">Order by:</label>
            <select class="select-filters" id="order_by" name="order_by">                
                <option value=""></option>
                <option value="Subject" >Subject ascending</option>
                <option value="-Subject">Subject descending</option>
                <option value="Created_at">Created at ascending</option>
                <option value="-Created_at">Created at descending</option>
            </select>
          
            <button type="submit" class="search-action-button" title="Filter the selected params"></button>
          </div>
          <form class="filter-form" method="GET" action={ apiUrl }>
            <button type="submit" class="clear-filters-button" title="Clear filters"></button>
          </form>  
        </div>
        <div class="new-issue">
          <button class="new-issue-btn" onclick="window.location.href='/newIssues/'">NEW ISSUE</button>        
          <button class="bulk-insert-btn" onclick="window.location.href='/bulk_insert/'"></button>  
        </div>

      </div> 
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
