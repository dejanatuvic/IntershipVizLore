# Zest - Data Project
## About the project
Zest - Data Project is a full-stack application that allows users to register and log in, upload CSV files, which are then processed in the backend, sent through a FIWARE Orion Context Broker, and stored in a MongoDB database. A React + Bootstrap frontend provides a UI for authentication and file upload.
## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Features

- ### User registration and login
    - Home page with registration and login screens.
    - Registration includes email validation and password confirmation where passwords are encrypted.
    - Login returns a JWT Bearer token for authorization of further requests.
- ### CSV file upload
    - A form on the page for uploading CSV files.
- ### Backend CSV parsing and data processing
    - Background processing of the uploaded file.
    - Conversion from CSV to NGSIv2 format.
    - Data sent via FIWARE Orion Context Broker
    - User notification about the success or failure of data processing.
- ### MongoDB storage integration
    - Storage of the processed data in a MongoDB database.

## Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Other:** Docker, Docker Compose

## Installation

1. **Clone the repository:**
   ```bash
   git clone "repo url"
   cd context-broker

2. **Start the application using Docker:**
   ```bash
   docker-compose up -d
   
3. **Access the application**
    - Frontend: http://localhost:3000
    - Backend: http://localhost:5000/auth
    - Orion Context Broker http://localhost:1026

3. **Local development (Optional)**
  - Frontend:
    ```bash
    cd frontend
    npm install
    nmp start
    
  - Backend:
      ```bash
     cd backend
     npm install
     node server.js


