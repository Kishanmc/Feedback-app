# 🍽️ Food Feedback App - Backend

This is a Node.js + Express backend application for collecting, managing, and exporting food feedback from users. It includes **role-based login for admins and users**, secure authentication, and admin-only controls like user blocking and feedback moderation.

## 🚀 Features

- 🔐 User & Admin Registration/Login
- ✍️ Submit Feedback (food quality, taste, hygiene, etc.)
- ✅ Admin Approval/Reject System
- 📤 Export Approved Feedbacks as CSV
- ⛔ Admin: Block abusive users
- 🔍 Search + Filter Feedbacks
- 🔐 JWT Authentication
- 🔁 Role-based Access Control

## 📁 Project Structure

```
food-feedback-app-backend/
├── controllers/
│   ├── feedbackController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── role.js
├── models/
│   ├── Feedback.js
│   └── User.js
├── routes/
│   ├── feedbackRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
├── .env
├── server.js
└── package.json
```


### 📦 Install Dependencies

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your_user>:<your_password>@cluster0.mongodb.net/feedbackDB
JWT_SECRET=supersecretkey
```

## ▶️ Run the App

### Development Mode:

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

## 🔌 API Endpoints

### 🧑 User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register as user or admin |
| POST | `/api/users/login` | Login and get JWT token |

### 📝 Feedback APIs (User)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit feedback (auth required) |
| GET  | `/api/feedback` | Get all feedbacks (optional filters) |

### 🛡️ Admin APIs (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/admin/feedback/:id/approval` | Approve/Reject feedback |
| PUT | `/api/admin/user/:id/block` | Block abusive user |
| GET | `/api/admin/feedback/export` | Export approved feedback to CSV |

## 🧑‍⚖️ Role-Based Access

- **Admin**: Can approve, reject, block users, and export data.
- **User**: Can register, login, and submit feedback.

## 🧰 Tech Stack

- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT for authentication
- bcrypt for password encryption
- json2csv for exporting data
- Postman for testing APIs

## ✍️ Author

Developed by **Kishan MC** 🚀  
Email: [kishanchannesh19@gmail.com](mailto:kishanchannesh19@gmail.com)

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Want Frontend?

React-based admin/user dashboard can be added — just ask!