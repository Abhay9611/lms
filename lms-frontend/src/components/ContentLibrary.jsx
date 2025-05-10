import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContentLibrary = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/content');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  const handleEdit = (item) => {
    // Implement edit logic here
    alert(`Edit: ${item.topic}`);
  };

  const handleDelete = (item) => {
    // Implement delete logic here
    alert(`Delete: ${item.topic}`);
  };

  return (
    <div>
      <h1>Content Library</h1>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Topic</th>
            <th>Video</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item, index) => (
            <tr key={index}>
              <td>{item.class}</td>
              <td>{item.topic}</td>
              <td>{item.video}</td>
              <td>
                <a href={item.pdf} target="_blank" rel="noopener noreferrer">View PDF</a>
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentLibrary; 