import React from 'react'
import '../assets/css/IssueDetail.css'

export const File = (props) => {
  const { id, name, file, issue, onDelete} = props;

  const handleDeleteFile = () => {
    onDelete(id);
  };

  return (
    <div class="file">
          <div class="file-info">
            <a class="file-name" href={file} download>
              {name}
            </a>
            <button class="taiga-btn-delete" onClick={handleDeleteFile}></button>
          </div>
    </div>
  )
}