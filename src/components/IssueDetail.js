import React from 'react'
import { useState, useEffect } from 'react';
import '../assets/css/IssueDetail.css'
import { Comment } from './Comment.js';
import { ActivityIssue } from './ActivityIssue.js';


const BASE_URL = 'https://issuetracker2-asw.herokuapp.com'

export const IssueDetail = ({issue}) => {
    const [id, setId] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [severity, setSeverity] = useState('');
    const [creator, setCreator] = useState('');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [newFile, setNewFile] = useState('');
    const [files, setFiles] = useState([]);
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [watchersArray, setWatchersArray] = useState([]);
    const [watchersUsers, setWatchersUsers] = useState([]);
    const [assignedArray, setAssignedArray] = useState([]);
    const [assigned, setAssigned] = useState('');


    const SERVER_URL = `${BASE_URL}/issues/${id}`;
    const POST_COMMENT_URL = `${BASE_URL}/issues/${id}/comments`;
    const POST_FILE_URL = `${BASE_URL}/issues/files/`;
    const POST_WATCHERS_URL = `${BASE_URL}/issues/${id}/watch`;
    const POST_ASSIGNED_URL = `${BASE_URL}/issues/${id}/assign`;
    const token = localStorage.getItem('token');

    useEffect(() => {
        setSubject(issue.Subject);
        setDescription(issue.Description)
        setDueDate(issue.Due_Date)
        setType(issue.Type)
        setPriority(issue.Priority)
        setStatus(issue.Status);
        setSeverity(issue.Severity)
        setCreator(issue.Creator_username)
        setId(issue.id)
        setComments(issue.comments ? Object.values(issue.comments) : []);
        setFiles(issue.files ? Object.values(issue.files) : []);
        setActivities(issue.activities ? Object.values(issue.activities) : []);
        setUsers(issue.users ? Object.values(issue.users) : []);
        setWatchersArray(issue.watchers ? Object.values(issue.watchers) : []);
        setAssignedArray(issue.assigned_users ? Object.values(issue.assigned_users) : []);
      }, [issue]);

    useEffect(() => {
        console.log(issue)
        //console.log(subject);
    }, [subject]);

    useEffect(() => {
      const dateOnly = dueDate ? dueDate.split('T')[0] : '';
      setDueDate(dateOnly);
    }, [dueDate]);

    useEffect(() => {
        // Check if the watchers array has a single element
        if (assignedArray.length === 1) {
          // Assign the element to the assigned variable
          setAssigned(assignedArray[0].User);
        }
      }, [assignedArray]);

    useEffect(() => {
        setWatchersUsers(watchersArray.map((watcher) => watcher.User));
        console.log(watchersUsers)
    }, [watchersArray]);

    const handlePut = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
          
          const dateObj = new Date(dueDate);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;      
          console.log(formattedDate)
          const data = {
            Subject: subject,
            Description: description,
            Type: type,
            Priority: priority,
            Status: status,
            Severity: severity, 
            Due_Date: formattedDate
          };
    
          const response = await fetch(SERVER_URL, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
          });
    
          const responseData = await response.json();
    
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handelCommentPost = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
    
          const data = {
            comment: newComment,
          };
    
          const response = await fetch(POST_COMMENT_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
    
          const responseData = await response.json();
    
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handelFilePost = async () => {
      try {    
        const headers = {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
          'content-type': newFile.type,
          'content-length': `${newFile.size}`, // 👈 Headers need to be a string
        };
  
        /*const data = {
          file: newFile,
          issue_id: id
        };*/

        const formData = new FormData();
        formData.append('file', newFile);
        formData.append('issue_id', id);
        
        console.log(formData)
        const response = await fetch(POST_FILE_URL, {
          method: 'POST',
          headers,
          body: formData
        });
  
        const responseData = await response.json();
  
      } catch (error) {
        console.error('Error:', error);
      }
  };


    const handleAssignedPost = async () => {
        try {    
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
    
          const data = {
            user: assigned,
          };
    
          const response = await fetch(POST_ASSIGNED_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
        
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const handleWatchersPost = async () => {
        try {
          const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          };
      
          const data = {
            users: watchersUsers,
          };
          console.log(data)
          const response = await fetch(POST_WATCHERS_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
          });
      
          // Handle the response as needed
        } catch (error) {
          console.error('Error:', error);
        }
    };
      

    const handleUserSelection = (userId, isSelected) => {
        if (isSelected) {
            setWatchersUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
        } else {
            setWatchersUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((id) => id !== userId)
          );
        }
    };
    
    const handleAssignedChange = (event) => {
        setAssigned(event.target.value);
    };

    const handleNewComment = (event) => {
        setNewComment(event.target.value);
    };

    const handleNewFile = (event) => {
      setNewFile(event.target.files[0]);
    };

    const handleDateChange = (event) => {
      setDueDate(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };
    return (
        <div class="form">
            <div class="form-element">
                <label class="subject-label">#{id}</label>
                <input class="subject-input" name="Subject" type="text" value={subject} onChange={handleSubjectChange}/>
            </div>
            <div class="info-issue">
              <label class="issue-label">ISSUE</label>
              <label class="creator-label">Created by {creator}</label>
            </div>
            <hr/>
            <br/>
            <div class="form-element">
                <textarea class="description-input" name="Description" value={description} onChange={handleDescriptionChange}/>
            </div>
            <br/>
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
                <option value="Posponed">Postponed</option>
            </select>
            <label className="search-bar" htmlFor="priority">
                Type:
              </label>
              <select className="select-filters" id="priority" name="priority" value={type} onChange={handleTypeChange}>
                <option value=""></option>
                <option value="Bug">Bug</option>
                <option value="Question">Question</option>
                <option value="Enhancement">Enhancement</option>
              </select>
            <label className="search-bar" htmlFor="priority">
                Severity:
            </label>
            <select className="select-filters" id="priority" name="priority" value={severity} onChange={handleSeverityChange}>
                <option value=""></option>
                <option value="Wishlist">Wishlist</option>
                <option value="Minor">Minor</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Critical">Critical</option>
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
            <input type="date" id="dateInput" value={dueDate} onChange={handleDateChange}/>
            <br/>
            <button className="save-info-button" onClick={handlePut}>Save</button>
            <br/>
            <hr/>
            <br/>
            <div class="assigned-component">
              <label class="assigned-label">Assigned to: </label>
              <select class="select-assigned" id="assigned" name="assigned" value={assigned} onChange={handleAssignedChange}>
                  <option value=""></option>
                  {Array.isArray(users) ? (
                    users.map(user => (
                      <option value={user.id}>{user.username}</option>
                    ))
                  ) : (
                    null
                  )}
              </select>
              <button class="assign-button" onClick={handleAssignedPost} title="Save assigned user"></button>
            </div>
            <br/>
            <div class="watchers-component">
              <label class="assigned-label">Watchers: </label>
              {users.map((user) => (
                  <li key={user.id}>
                      <input
                      type="checkbox"
                      name="watchers[]"
                      value={user.id}
                      checked={watchersUsers.some((watcher) => watcher === user.id)}
                      onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                      />
                      {user.username}
                  </li>
              ))}
              <button class="assign-button" onClick={handleWatchersPost} title="Save watchers"></button>
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="comments-component">
              <label class="issue-label">COMMENTS</label>
              <br/>
              <br/>
              <div class="add-comment">
                <textarea class="comment-textarea" name="Comment" placeholder="Type a new comment here" onChange={handleNewComment} required></textarea>
                <button name="create" class="post-comment-button" onClick={handelCommentPost}>POST</button>
              </div>
              <br/>
              {comments.map((comment, index) => (
                  <Comment key={index} comment={comment.Comment} created_at={comment.Created_at} creator={comment.Username} />
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
            <div class="activities-component">
              <label class="issue-label">ACTIVITIES</label>
              <br/>
              <br/>
              {activities.map((activity, index) => (
                  <ActivityIssue key={index} created_at={activity.Created_at} creator={activity.Creator_username} old_user={activity.Old_user_username} 
                  type={activity.Type} user={activity.User_username}/>
              ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <br/>
          <div>
            <input type="file" onChange={handleNewFile} />
            <button onClick={handelFilePost}>Upload File </button>
          </div>
        </div>
  );
};
