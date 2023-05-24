import React, { useEffect, useState } from 'react';
import { Issue } from '../components/Issue.js';
import { NavigationBar } from '../components/NavigationBar.js';
import '../assets/css/IssuesViewStyles.css'

export const IssuesView = () => {
  const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
  const [apiResponse, setApiResponse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [creator, setCreator] = useState('');
  const [orderBy, setOrderBy] = useState('');
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

  const searchIssues = async () => {
    // Construir la URL con los parámetros de búsqueda
    const apiUrl = 'https://issuetracker2-asw.herokuapp.com/issues/';
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    if (creator) params.append('creator', creator);
    if (orderBy) params.append('order_by', orderBy);
    const urlWithParams = `${apiUrl}?${params.toString()}`;
    console.log(urlWithParams)

    // Realizar la petición con la URL construida
    try {
      const headers = {
        Authorization: 'Token a571977cf3bf557efd80fb12cd154fb6b46aa307',
        'Content-Type': 'application/json'
      };
  
        const response = await fetch(urlWithParams, {
          method: 'GET',
          headers,
        });
  
      if (response.ok) {
        const responseData = await response.json();
        // Actualizar el estado de apiResponse con los nuevos datos recibidos
        setApiResponse(responseData);
      } else {
        console.log('Error al realizar la búsqueda');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleCreatorChange = (event) => {
    setCreator(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  return (
    <div class="WNDW">
      <NavigationBar></NavigationBar>
      <div class="taskboard-actions">
        <div class="issue-table-options">
          <div className="filter-form">
            <input
              className="search-bar"
              type="text"
              name="q"
              placeholder="subject or description"
              autoComplete="on"
              value={searchQuery}
              onChange={handleInputChange}
            />

            <label className="search-bar" htmlFor="status">
              Status:
            </label>
            <select className="select-filters" id="status" name="status" value={status} onChange={handleStatusChange}>
              <option value=""></option>
              <option value="New">New</option>
              <option value="In progress">In progress</option>
              <option value="Ready for test">Ready for test</option>
              <option value="Closed">Closed</option>
              <option value="Needs info">Needs info</option>
              <option value="Rejected">Rejected</option>
              <option value="Postponed">Postponed</option>
            </select>

            <label className="search-bar" htmlFor="priority">
              Priority:
            </label>
            <select className="select-filters" id="priority" name="priority" value={priority} onChange={handlePriorityChange}>
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>

            <label className="search-bar" htmlFor="creator">
              Created by:
            </label>
            <select className="select-filters" id="creator" name="creator" value={creator} onChange={handleCreatorChange}>
              <option value=""></option>
              {/* PARA CADA USUARIO */}
              <option value="USERNAME"></option>
            </select>

            <label className="search-bar" htmlFor="order_by">
              Order by:
            </label>
            <select className="select-filters" id="order_by" name="order_by" value={orderBy} onChange={handleOrderByChange}>
              <option value=""></option>
              <option value="Subject">Subject ascending</option>
              <option value="-Subject">Subject descending</option>
              <option value="Created_at">Created at ascending</option>
              <option value="-Created_at">Created at descending</option>
            </select>

            <button className="search-action-button" onClick={searchIssues} title="Filter the selected params"></button>
          </div>
          <div class="filter-form" method="GET" action={ apiUrl }>
            <button type="submit" class="clear-filters-button" title="Clear filters"></button>
          </div>  
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
