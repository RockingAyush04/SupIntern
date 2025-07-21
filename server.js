// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcryptjs";
// import pkg from "pg";
// const { Pool } = pkg;


// const app = express();
// app.use(cors());
// app.use(express.json());
// console.log({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// });

// const pool = new Pool({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// });

// // Signup endpoint
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await pool.query(
//       'INSERT INTO users (name, email, password, status) VALUES ($1, $2, $3, $4)',
//       [name, email, hashedPassword, 'pending']
//     );
//     res.json({ success: true });
//   } catch (err) {
//     console.error('Signup error:', err); // <--- IMPORTANT for debugging
//     if (err.code === '23505') {
//       res.json({ success: false, message: 'Email already registered.' });
//     } else {
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   }
// });

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     const user = result.rows[0];
//     if (user && (user.status === 'active' || user.role === 'admin') && await bcrypt.compare(password, user.password)) {
//       res.json({
//         success: true,
//         user: { id: user.id, name: user.name, email: user.email, role: user.role }
//       });
//     } else {
//       res.json({ success: false, message: 'Invalid email or password.' });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // Get pending users (for admin panel)
// app.get('/api/users/pending', async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT id, name, email, role, status, supervisor_id FROM users WHERE status = 'pending'"
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Approve user and assign role/supervisor
// app.post('/api/users/approve', async (req, res) => {
//   const { userId, role, supervisorId } = req.body;
//   try {
//     await pool.query(
//       "UPDATE users SET role = $1, status = 'active', supervisor_id = $2 WHERE id = $3",
//       [role, supervisorId || null, userId]
//     );
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// // Get all supervisors
// app.get('/api/users/supervisors', async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT id, name, email FROM users WHERE role = 'supervisor' AND status = 'active'"
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get interns for a supervisor
// app.get('/api/users/interns/:supervisorId', async (req, res) => {
//   const { supervisorId } = req.params;
//   try {
//     const result = await pool.query(
//       "SELECT id, name, email FROM users WHERE role = 'intern' AND supervisor_id = $1 AND status = 'active'",
//       [supervisorId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get all users (for admin listing, optional)
// app.get('/api/users/all', async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT id, name, email, role, status, supervisor_id FROM users"
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Create task
// app.post('/api/tasks', async (req, res) => {
//   const { userId, date, task, hours, description } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO tasks (user_id, date, task, hours, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [userId, date, task, hours, description]
//     );
//     res.json({ success: true, task: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// // List tasks for a user
// app.get('/api/tasks/user/:userId', async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM tasks WHERE user_id = $1 ORDER BY date ASC",
//       [req.params.userId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Update task
// app.put('/api/tasks/:id', async (req, res) => {
//   const { date, task, hours, description } = req.body;
//   try {
//     const result = await pool.query(
//       "UPDATE tasks SET date=$1, task=$2, hours=$3, description=$4 WHERE id=$5 RETURNING *",
//       [date, task, hours, description, req.params.id]
//     );
//     res.json({ success: true, task: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// // Delete task
// app.delete('/api/tasks/:id', async (req, res) => {
//   try {
//     await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`API running on port ${PORT}`));

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

console.log({
  database_url: process.env.DATABASE_URL,
  
});


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password, status) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, 'pending']
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err); // <--- IMPORTANT for debugging
    if (err.code === '23505') {
      res.json({ success: false, message: 'Email already registered.' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && (user.status === 'active' || user.role === 'admin') && await bcrypt.compare(password, user.password)) {
      res.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      res.json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get pending users (for admin panel)
app.get('/api/users/pending', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, status, supervisor_id FROM users WHERE status = 'pending'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Approve user and assign role/supervisor
app.post('/api/users/approve', async (req, res) => {
  const { userId, role, supervisorId } = req.body;
  try {
    await pool.query(
      "UPDATE users SET role = $1, status = 'active', supervisor_id = $2 WHERE id = $3",
      [role, supervisorId || null, userId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get all supervisors
app.get('/api/users/supervisors', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role = 'supervisor' AND status = 'active'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get interns for a supervisor
app.get('/api/users/interns/:supervisorId', async (req, res) => {
  const { supervisorId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role = 'intern' AND supervisor_id = $1 AND status = 'active'",
      [supervisorId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users (for admin listing, optional)
app.get('/api/users/all', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, status, supervisor_id FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  const { userId, date, task, hours, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, date, task, hours, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, date, task, hours, description]
    );
    res.json({ success: true, task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// List tasks for a user
app.get('/api/tasks/user/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY date ASC",
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  const { date, task, hours, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET date=$1, task=$2, hours=$3, description=$4 WHERE id=$5 RETURNING *",
      [date, task, hours, description, req.params.id]
    );
    res.json({ success: true, task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));