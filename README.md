#  Feedback App - Full Stack (MERN)

This is a full stack **MERN** application for collecting, managing, and exporting food-related feedbacks. It includes:

- Role-based access: **Admin** and **User**
- Feedback submission with category, message, and rating
- Admin moderation (Approve/Reject)
- CSV export for approved feedbacks
- User blocking system (admin only)
- JWT Authentication

---

## 🚀 Tech Stack

- **Frontend**: React.js (with Axios, React Router)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT + bcrypt
- **CSV Export**: `json2csv`

---

## 📁 Project Structure

### Backend (`food-feedback-app-backend/`)

```
controllers/
├── adminController.js
├── feedbackController.js
├── userController.js

routes/
├── adminRoutes.js
├── feedbackRoutes.js
├── userRoutes.js

models/
├── Feedback.js
├── User.js

middleware/
├── auth.js
├── admin_user.js

.env
server.js
```

### Frontend (`food-feedback-app-frontend/`)

```
src/
├── components/
│   ├── Login.js
│   ├── Register.js
│   ├── Navbar.js
│   ├── FeedbackForm.js
│   ├── AdminDashboard.js
│   ├── UserDashboard.js
│   └── ProtectedRoute.js
├── api/
│   └── api.js
├── App.js
├── index.js
```

---

## 🔐 Environment Setup

### 🔸 Backend `.env`

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/feedbackDB
JWT_SECRET=your_jwt_secret
```

### 🔸 Frontend `.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 API Overview

### User Routes
- `POST /api/users/register` - Register user/admin
- `POST /api/users/login` - Login

### Feedback (User)
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback?status=approved&keyword=xyz` - Admin fetch feedbacks

### Admin Actions
- `PUT /api/admin/feedback/:id/approval` - Approve/Reject feedback
- `PUT /api/admin/user/:id/block` - Block a user
- `GET /api/admin/feedback/export` - Download approved feedbacks as CSV

---

## 🧰 Features

- ✅ JWT Auth (stored in localStorage)
- ✅ Role-based routing (protected)
- ✅ Form handling with validation
- ✅ CSV file download (admin)
- ✅ Simple styling using JS only (no CSS file)
- ✅ Responsive layout for forms and dashboard

---

## 🙋‍♂️ Author

Developed by **Kishan MC**  
📧 kishanchannesh19@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
