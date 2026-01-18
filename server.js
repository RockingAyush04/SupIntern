import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// --- Mongoose Schemas & Models ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'intern', enum: ['intern', 'supervisor', 'admin'] },
  status: { type: String, default: 'pending', enum: ['pending', 'active', 'rejected'] },
  supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  task: { type: String, required: true },
  hours: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// --- API Endpoints ---

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      status: 'pending'
    });

    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (user.status === 'active' || user.role === 'admin') && await bcrypt.compare(password, user.password)) {
      res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      res.json({ success: false, message: 'Invalid email or password, or account pending approval.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get pending users (for admin panel)
app.get('/api/users/pending', async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Approve user and assign role/supervisor
app.post('/api/users/approve', async (req, res) => {
  const { userId, role, supervisorId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      status: 'active',
      role: role,
      supervisor_id: supervisorId || null
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get all supervisors
app.get('/api/users/supervisors', async (req, res) => {
  try {
    const supervisors = await User.find({ role: 'supervisor', status: 'active' }).select('name email');
    res.json(supervisors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get interns for a supervisor
app.get('/api/users/interns/:supervisorId', async (req, res) => {
  const { supervisorId } = req.params;
  try {
    const interns = await User.find({ role: 'intern', supervisor_id: supervisorId, status: 'active' }).select('name email');
    res.json(interns);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users (for admin listing, optional)
app.get('/api/users/all', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  const { userId, date, task, hours, description } = req.body;
  try {
    const newTask = await Task.create({
      user_id: userId,
      date,
      task,
      hours,
      description
    });
    res.json({ success: true, task: newTask });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// List tasks for a user
app.get('/api/tasks/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.params.userId }).sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  const { date, task, hours, description } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      date,
      task,
      hours,
      description
    }, { new: true });
    res.json({ success: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));