
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'intern', enum: ['intern', 'supervisor', 'admin'] },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'rejected'] },
    supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected for seeding");

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
            status: "active"
        });

        console.log("Admin user created successfully!");
        console.log("Email: admin@example.com");
        console.log("Password: admin123");

        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};

seedAdmin();
