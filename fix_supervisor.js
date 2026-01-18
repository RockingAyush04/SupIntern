
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'intern', enum: ['intern', 'supervisor', 'admin'] },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'rejected'] },
    supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const fixSupervisor = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

        const email = "ayushpadhy1309@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found!");
            process.exit(1);
        }

        console.log(`Found User: ${user.name} (${user.email})`);
        console.log(`Current Role: ${user.role}, Status: ${user.status}`);

        user.role = 'supervisor';
        user.status = 'active';
        user.supervisor_id = null; // Supervisors don't have supervisors
        await user.save();

        console.log("SUCCESS: User updated to Supervisor!");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

fixSupervisor();
