# Micro Tasking and Earning Platform

## 📌 Overview
The **Micro Tasking and Earning Platform** enables users to complete small tasks and earn money. Inspired by platforms like **Picoworkers**, **Clickworker**, and **SEOClerks** (without copying designs), the system supports **three user roles** with role-specific dashboards and functionalities:

- **Worker** – Completes tasks, earns coins, withdraws money, and receives notifications.
- **Buyer** – Creates tasks, reviews submissions, pays Workers, purchases coins, and reports issues.
- **Admin** – Manages users, handles reports, approves withdrawals, and oversees system integrity.

---

## 📂 Table of Contents
1. [Features](#-features)
2. [Role Functionalities](#-role-functionalities)
3. [Layout Structure](#-layout-structure)
4. [Authentication System](#-authentication-system)
5. [Dashboard Functionalities](#-dashboard-functionalities)
6. [Business Logic](#-business-logic)
7. [Payment & Withdrawal](#-payment--withdrawal)
8. [Notifications](#-notifications)
9. [Image Upload](#-image-upload)
10. [API Documentation](#-api-documentation)
11. [Installation](#-installation)
12. [Configuration](#-configuration)
13. [Troubleshooting](#-troubleshooting)
14. [License](#-license)

---

## ✨ Features
- **Three distinct roles** (Worker, Buyer, Admin) with role-based access.
- **Responsive design** with animations and sliders.
- **Secure authentication** (email/password + Google Sign-In).
- **Stripe payment integration** for coin purchases.
- **Withdrawals** with currency conversion logic.
- **Role-based authorization middleware**.
- **Notification system** for approvals, rejections, withdrawals, and submissions.
- **Pagination** for submission lists.
- **Image uploads via imgBB**.

---

## 👤 Role Functionalities

### Worker
- View available tasks and submit proof.
- Track approved submissions and earnings.
- Withdraw coins for cash.
- View personalized notifications.

### Buyer
- Create, update, delete, and manage tasks.
- Review submissions (approve/reject).
- Purchase coins via Stripe.
- View payment history.

### Admin
- Manage all users (edit roles, remove).
- Approve or reject withdrawal requests.
- Manage all tasks.
- View platform-wide statistics.

---

## 🖥 Layout Structure

### Basic Layout
- **Navbar**
  - Not logged in: Logo, Login, Register, Join as Developer (links to GitHub repo).
  - Logged in: Logo (home), Dashboard, Available Coins, Profile + Logout, Join as Developer.
- **Footer**
  - Logo, clickable social icons (LinkedIn, Facebook, GitHub).

### Home Page
- **Hero Section** – Animated slider or background video (3 banners).
- **Best Workers** – Top 6 Workers by coins.
- **Testimonial Section** – Static Swiper slider with user feedback.
- **Extra Sections** – At least 3 additional creative content areas.

---

## 🔐 Authentication System

### Registration
- Fields: Name, Email, Profile Picture URL, Password, Role (Worker/Buyer).
- Default Coins: 10 for Workers, 50 for Buyers.
- Email format & password strength validation.
- Store user info + coins in database.

### Login
- Email/password or Google Sign-In.
- Validation for incorrect credentials.
- Store **JWT token** in browser local storage.
- Redirect to role-specific dashboard after login.

---

## 📊 Dashboard Functionalities

### Worker Dashboard
- View stats (total submissions, pending, total earnings).
- Approved Submissions table.
- Task List with details & submission form.
- My Submissions (with pagination).
- Withdrawals with coin-to-dollar conversion.

### Buyer Dashboard
- View stats (task count, pending tasks, total paid).
- Review submissions (approve/reject with coin updates).
- Add New Tasks (with image upload, budget validation).
- My Tasks (update/delete with coin refunds for unfinished tasks).
- Purchase Coins via Stripe.
- Payment History.

### Admin Dashboard
- View stats (total workers, buyers, coins, payments).
- Manage withdrawal requests.
- Manage all users (role updates, removal).
- Manage all tasks (delete if needed).

---

## 💰 Business Logic
- **Coin Purchase**:  
  - 10 coins = $1  
  - 150 coins = $10  
  - 500 coins = $20  
  - 1000 coins = $35  
- **Withdrawal Rate**:  
  - 20 coins = $1 (minimum withdrawal = 200 coins / $10).  
- **Platform Earnings**:  
  - Buyers buy coins at 10 coins = $1, Workers withdraw at 20 coins = $1.

---

## 💳 Payment & Withdrawal
- **Stripe Payment Gateway** (or dummy payment if unavailable).
- Buyer coin top-up after successful payment.
- Worker withdrawal request with status tracking (pending → approved).

---

## 🔔 Notifications
- Triggered on:
  - Submission approval/rejection.
  - Withdrawal approval.
  - New submission to Buyer.
- Stored in database and displayed in popup format.
- Clickable to navigate to relevant dashboard section.

---

## 🖼 Image Upload
- **imgBB Integration**:
  - For profile pictures during registration.
  - For task images in Add New Task form.

---

## 📡 API Documentation

### **Base URL**
```
https://your-domain.com/api
```

### **Authentication & User Management**
| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| POST   | `/auth/register`     | Register new user (Worker/Buyer). Returns JWT token. |
| POST   | `/auth/login`        | Login with email/password. Returns JWT token. |
| POST   | `/auth/google`       | Google OAuth login. Returns JWT token. |
| GET    | `/auth/me`           | Get current user info (requires token). |
| PUT    | `/users/:id`         | Update user profile info. |
| DELETE | `/users/:id`         | Delete user account (Admin only). |

### **Task Management (Buyer)**
| Method | Endpoint                      | Description |
|--------|--------------------------------|-------------|
| POST   | `/tasks`                       | Create new task (validates coin balance). |
| GET    | `/tasks`                       | Get all tasks (public or filtered). |
| GET    | `/tasks/my`                    | Get tasks created by logged-in Buyer. |
| GET    | `/tasks/:id`                   | Get task details by ID. |
| PUT    | `/tasks/:id`                   | Update Buyer’s own task details. |
| DELETE | `/tasks/:id`                   | Delete task (refund coins if applicable). |

### **Task Browsing & Submission (Worker)**
| Method | Endpoint                         | Description |
|--------|-----------------------------------|-------------|
| GET    | `/tasks/available`               | Get tasks where `required_workers > 0`. |
| POST   | `/submissions`                   | Submit proof for a task. |
| GET    | `/submissions/my`                | Get submissions by current Worker (with pagination). |
| GET    | `/submissions/approved`          | Get approved submissions for Worker. |

### **Submission Review (Buyer)**
| Method | Endpoint                         | Description |
|--------|-----------------------------------|-------------|
| GET    | `/submissions/to-review`         | Get submissions pending review for Buyer’s tasks. |
| PUT    | `/submissions/:id/approve`       | Approve submission (update Worker coins). |
| PUT    | `/submissions/:id/reject`        | Reject submission (refill Buyer’s `required_workers`). |

### **Coin Purchase & Payments**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| POST   | `/payments/create`       | Create Stripe payment session. |
| POST   | `/payments/webhook`      | Stripe webhook endpoint. |
| GET    | `/payments/history`      | Get Buyer’s payment history. |

### **Withdrawals (Worker & Admin)**
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| POST   | `/withdrawals`             | Request withdrawal (Worker). |
| GET    | `/withdrawals/my`          | Get Worker’s withdrawal requests. |
| GET    | `/withdrawals/pending`     | Get all pending withdrawal requests (Admin). |
| PUT    | `/withdrawals/:id/approve` | Approve withdrawal and deduct Worker coins (Admin). |

### **Admin Management**
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| GET    | `/admin/stats`      | Get platform-wide statistics. |
| GET    | `/admin/users`      | Get all users. |
| PUT    | `/admin/users/:id`  | Update user role. |
| DELETE | `/admin/users/:id`  | Remove a user. |
| GET    | `/admin/tasks`      | Get all tasks. |
| DELETE | `/admin/tasks/:id`  | Delete any task. |

### **Notifications**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| GET    | `/notifications`         | Get notifications for current user (sorted DESC). |
| POST   | `/notifications`         | Create new notification (system-triggered). |
| PUT    | `/notifications/:id`     | Mark notification as read. |

---

## ⚙ Installation
```bash
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev
```

---

## 🔧 Configuration
```
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
STRIPE_SECRET_KEY=<Your Stripe Secret Key>
IMGBB_API_KEY=<Your imgBB API Key>
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>
```

---

## 🛠 Troubleshooting
- JWT errors → Check token storage & middleware logic.
- Stripe issues → Verify API keys & test mode setup.
- Image uploads failing → Check imgBB API key.
- Notifications missing → Ensure database queries filter by `toEmail`.

---

## 📜 License
This project is licensed under the **MIT License**.
