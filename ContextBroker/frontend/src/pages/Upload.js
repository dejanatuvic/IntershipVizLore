import React, { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Choose CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File sent successfuly to Orion Context Broker!');
      } else {
        setMessage(data.message || 'Error sending file.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

    return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">Upload CSV file</h3>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Choose CSV file</label>
          <input
            className="form-control"
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Upload</button>
      </form>
    </div>
  );
}