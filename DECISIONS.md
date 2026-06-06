# Decisions

## Why I Chose This Stack

I chose HTML, CSS, and JavaScript for the frontend because they are lightweight, easy to develop with, and provide complete control over the user interface without requiring additional frameworks.

For the backend, I selected Node.js with Express.js because it is fast, efficient, and well-suited for building REST APIs. Express.js simplifies route management and middleware handling.

I used MySQL as the database because it provides structured relational storage, supports relationships between users, events, and registrations, and is widely used in web application development.

JWT authentication was chosen to securely manage user sessions and protect API routes.

## One Decision Not Specified in the Brief

I implemented JWT (JSON Web Token) based authentication and authorization for securing the application's API routes. After a successful login, a JWT token is generated and stored on the client side. This token must be included in subsequent API requests, allowing the backend to verify the user's identity and role before granting access.This approach provides secure access to protected resources.

## One Thing I Would Improve With More Time

* Event editing and deletion functionality for administrators.
* Real-time dashboard updates without page refresh.
* Email notifications for successful registrations.
* Improved mobile responsiveness.
* Search and filtering options for events.


