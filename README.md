# SupIntern

SupIntern is a MERN-stack web application designed to streamline internship management for organizations. It enables admins to onboard users, supervisors to manage interns, and interns to log and track their daily tasks efficiently.

---

## 🚀 Features

- **User Authentication:** Secure signup/login for admins, supervisors, and interns.
- **Role Management:** Admin can review, approve, and assign roles (Intern, Supervisor) to users.
- **Supervisor Dashboard:** View and manage assigned interns, view their tasks, download task reports (CSV).
- **Intern Dashboard:** Submit daily tasks, view/edit/delete past entries.
- **Task Management:** Full CRUD operations on tasks.
- **Data Export:** Supervisors can export intern task reports as CSV files.
- **Responsive UI:** Built with React and Material UI Joy for a clean, modern look.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** (Vite)
- **Material UI Joy** (Component Library)
- **React Router DOM** (Navigation)
- **Context API** (State Management)

### **Backend**
- **Node.js** & **Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **bcryptjs** (Authentication)
- **cors** & **dotenv** (Utilities)

### **Deployment**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🗃️ Database Models (Mongoose)

### **User**
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: 'intern' | 'supervisor' | 'admin'
- `status`: 'pending' | 'active'
- `supervisor_id`: ObjectId (Ref: User)

### **Task**
- `user_id`: ObjectId (Ref: User)
- `date`: String (ISO Date)
- `task`: String
- `hours`: Number
- `description`: String

---

## ⚡ Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/RockingAyush04/SupIntern.git
cd SupIntern
```

### **2. Setup Environment Variables**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/supintern?retryWrites=true&w=majority
PORT=4000
```
For the frontend (if deploying separately), you may also need `VITE_API_URL` if not running locally. Locally it defaults to `http://localhost:4000`.

### **3. Install Dependencies**
```bash
npm install
```

### **4. Start the Application**
Run both Frontend and Backend concurrently:
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## 🏗️ Deployment Guides

### **Backend (Render)**
1. Connect GitHub repo to Render.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Add Environment Variables: `MONGODB_URI`.
5. **Important:** Ensure MongoDB Atlas Network Access is set to allow any IP (`0.0.0.0/0`) since Render IPs are dynamic.

### **Frontend (Vercel)**
1. Connect GitHub repo to Vercel.
2. Framework Preset: **Vite**.
3. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-app.onrender.com` (Your deployed Render backend URL).

---

## 👥 User Roles & Workflow

1. **New User Signup:** User signs up and is set to `Pending` status.
2. **Admin Approval:**
   - Admin logs in.
   - Assigns a **Role** (Intern/Supervisor).
   - If User is an **Intern**, Admin assigns a **Supervisor**.
   - Admin approves the user.
3. **Supervisor Flow:**
   - Logs in to see assigned Interns.
   - Views tasks logged by interns.
4. **Intern Flow:**
   - Logs daily tasks (Date, Task, Hours, Description).
   - Can Edit/Delete their own tasks.

---

## 🔒 Security

- Passwords are hashed using `bcryptjs`.
- Frontend uses filtered API responses (passwords excluded).
- CORS policies configured for security.

---

## 📄 License

MIT