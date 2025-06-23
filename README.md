# SupIntern

SupIntern is a full-stack web application designed to streamline internship management for organizations. It enables admins to onboard users, supervisors to manage interns, and interns to log and track their daily tasks efficiently.

---

## 🚀 Features

- **User Authentication:** Secure signup/login for admins, supervisors, and interns.
- **Role Management:** Admin can review, approve, and assign roles to users.
- **Supervisor Dashboard:** View and manage assigned interns, view their tasks, download task reports.
- **Intern Dashboard:** Submit daily tasks, view/edit/delete past entries.
- **Task Management:** CRUD operations on tasks (create, read, update, delete).
- **CSV Export:** Supervisors can export intern task reports as CSV files.
- **Responsive UI:** Built with Material UI Joy for a clean and modern look.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** (with hooks)
- **Material UI Joy** (component library)
- **Axios** (API requests)

### **Backend**
- **Node.js** with **Express.js**
- **PostgreSQL** (hosted on [Neon](https://neon.tech/))
- **pg** (Node PostgreSQL client)
- **bcryptjs** (password hashing)
- **dotenv** (environment variable management)
- **CORS** (cross-origin resource sharing)

### **Deployment**
- **Frontend:** Vercel/Netlify/Render (static hosting)
- **Backend:** Render/Railway/Fly.io (Node.js hosting)
- **Database:** Neon (cloud Postgres)

---

## 🗃️ Database Structure

### **users**
| Column        | Type           | Description                               |
|---------------|----------------|-------------------------------------------|
| id            | SERIAL PRIMARY | Unique user ID                            |
| name          | VARCHAR        | User's full name                          |
| email         | VARCHAR UNIQUE | User's email                              |
| password      | VARCHAR        | Hashed password                           |
| role          | VARCHAR        | 'admin', 'supervisor', or 'intern'        |
| status        | VARCHAR        | 'pending', 'active', 'approved', etc.     |
| supervisor_id | INTEGER        | (For interns) references users(id)        |
| created_at    | TIMESTAMP      | Timestamp of registration                 |

### **tasks**
| Column        | Type           | Description                      |
|---------------|----------------|----------------------------------|
| id            | SERIAL PRIMARY | Unique task ID                   |
| user_id       | INTEGER        | References users(id)             |
| date          | DATE           | Date of the task entry           |
| task          | VARCHAR        | Short task title                 |
| hours         | INTEGER        | Hours spent                      |
| description   | TEXT           | Detailed description             |
| created_at    | TIMESTAMP      | When the task was logged         |

---

## 📐 Application Architecture

```
Frontend (React)
    |
    | REST API (fetch, axios)
    v
Backend (Express.js)
    |
    | pg (PostgreSQL client)
    v
Database (Neon PostgreSQL)
```

---

## ⚡ Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/supintern.git
cd supintern
```

### **2. Setup Backend**

- Go to `backend/`
- Create a `.env` file with:
  ```
  DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
  PORT=4000
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start server:
  ```bash
  npm start
  ```

### **3. Setup Frontend**

- Go to `frontend/`
- Install dependencies:
  ```bash
  npm install
  ```
- Configure API base URL in `.env` (e.g., `REACT_APP_API_URL=https://your-backend-url.com`)
- Start client:
  ```bash
  npm start
  ```

---

## 🏗️ Deployment

- **Backend:** Deploy to Render/Railway/Fly.io. Set `DATABASE_URL` as env variable.
- **Frontend:** Deploy to Vercel/Netlify/Render. Point API calls to deployed backend.
- **Database:** Tables created and seeded on Neon dashboard.

---

## 👥 User Roles

- **Admin:** Approves new users, assigns roles, can see all users.
- **Supervisor:** Manages assigned interns, reviews and exports their tasks.
- **Intern:** Submits and manages their own daily tasks.

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt before storage.
- All sensitive data (like DB credentials) is stored in `.env` files and environment variables.
- CORS is enabled on backend for secure API access.

---

## 📄 License

MIT

---