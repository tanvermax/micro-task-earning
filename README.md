# Micro-Task and Earning Platform

## Overview
The **Micro-Task and Earning Platform** provides an innovative way for users to complete small tasks and earn rewards. The platform caters to three distinct roles:

- **Worker**: Completes tasks and earns rewards.
- **Buyer**: Creates tasks and manages payments.
- **Admin**: Oversees and manages the platform.

This project is built using the **MERN stack** to deliver a responsive, robust, and scalable experience for all users.

## Admin Credentials
- **Admin Email**: `admin@example.com`
- **Admin Password**: `admin123`

## Live Site URL
[Micro-Task Platform Live Site](https://earnly-f35f1.web.app/)

## GitHub Repository Links
- **Client Side**: [GitHub - Client](https://github.com/example-client-repo)
- **Server Side**: [GitHub - Server](https://github.com/example-server-repo)

## Key Features
1. **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
2. **Role-Based Authorization**: Secure access and features based on user roles (Worker, Buyer, Admin).
3. **Authentication**: Email/password and Google login integration with token-based security.
4. **Worker Dashboard**:
   - View available tasks and submit for rewards.
   - Track submissions and earnings.
   - Withdraw rewards using multiple payment systems (Bkash, Rocket, Nagad).
5. **Buyer Dashboard**:
   - Create tasks with detailed descriptions and requirements.
   - Review worker submissions and approve/reject with feedback.
   - Manage coins and payment history.
6. **Admin Dashboard**:
   - Manage users, roles, and tasks.
   - Handle withdrawal requests and monitor platform activity.
   - Role-based notifications for all user actions.
7. **Dynamic Notifications**: Real-time updates for task approval, payment, and submission actions.
8. **Secure Data Handling**: Firebase config and MongoDB credentials secured using environment variables.
9. **Home Page Animation**: Interactive hero section with a swiper slider and engaging design.
10. **Pagination**: Implemented for submissions and task lists for improved user experience.

## Installation and Setup
### Prerequisites
- Node.js (v14+)
- MongoDB
- Firebase Project for Authentication

### Steps
1. Clone the repositories:
   ```bash
   git clone https://github.com/example-client-repo
   git clone https://github.com/example-server-repo
   ```

2. Navigate to the client and server directories and install dependencies:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Configure environment variables:
   - For the client:
     - `.env.local`
       ```env
       REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
       REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
       ```
   - For the server:
     - `.env`
       ```env
       MONGO_URI=your-mongodb-connection-string
       JWT_SECRET=your-jwt-secret
       ```

4. Start the client and server:
   ```bash
   # In client directory
   npm start

   # In server directory
   npm run start
   ```

5. Deploy the application:
   - Client: Deploy to Firebase or Netlify.
   - Server: Deploy to a cloud service like Render or Heroku.

## Dependencies
### Client
- React.js
- React Router
- Firebase Authentication
- Swiper Slider
- react-toastify
- react-helmet-async

### Server
- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe for Payments
- jsonwebtoken
- bcrypt

## Additional Features
1. **Automated Email Notifications**: Notify users for key actions like task approvals, payments, and withdrawals.
2. **Advanced Search and Filters**: Filter tasks by type, deadline, reward amount, and status.
3. **Report System**: Admin can handle invalid submissions with a streamlined reporting mechanism.

## Challenges Addressed
- Implemented a secure token-based authentication system.
- Developed a scalable notification system with real-time updates.
- Optimized the platform for seamless role-based interactions.

## Conclusion
This platform provides a user-friendly, feature-rich experience tailored to workers, buyers, and admins. It showcases a deep understanding of the MERN stack and modern web development practices.
