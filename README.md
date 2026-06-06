## College Event Registration Portal
A web-based application that allows students to register for college events and enables administrators to manage events and monitor registrations built using MySQL,Node.js&Express.js,HTML/CSS/Javascript.

## Features
# Admin
    Login using admin credentials
    Create new events
    View all events
    View registration statistics for each event
    View all students registered for a specific event

# Student
    Login using student credentials
    View available events sorted by date
    Register for events
    View registered events

# Additional Features
    JWT-based authentication
    Protected API routes

## Setup Instructions
### 1. Install Dependencies
Navigate to the backend folder and install required packages:
npm install
### 2. Create Database
Create a MySQL database
CREATE DATABASE event_portal;
Execute the seed.sql script provided in the project to create:
users
events
registrations
tables.
## Environment Variables
Create a .env file in the root directory and configure it using the variables shown in .env.example.

### 3. Start Server
node server.js

The server will run on:
http://localhost:3000

### Launch the Frontend
Open the frontend folder using VS Code.
Start the project using Live Server and open:
login.html
The application will be accessible in your browser.

### Sample data includes:
# Admin Account
Username: admin

Password: inspirante2026

# Student Accounts
Username: asha.rao

Password: student123
Additional student accounts are also included for testing event registrations.

### Notes
Backend must be running before accessing the frontend.
MySQL server must be active.
JWT authentication is required for protected routes.
All API endpoints are prefixed with /api/.
Events are displayed in ascending order of date.
Event capacity restrictions are enforced on the backend.


