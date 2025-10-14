#!/usr/bin/env bash
echo "🚀 Setting up TypeScript + Express + MongoDB backend..."

# Create backend folder
mkdir -p secure-backend
cd secure-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install -D typescript ts-node @types/node @types/express @types/bcryptjs @types/jsonwebtoken @types/cors nodemon

# Initialize TypeScript config
npx tsc --init

# Create folder structure
mkdir -p src/{routes,models,controllers,config,utils}

# Create .env file
cat <<EOF > .env
PORT=4000
MONGO_URI=mongodb+srv://iconicpc127_db_user:kCnJHuqVbi0Bauno@cluster0.k4hyqvs.mongodb.net/sch-project?retryWrites=true&w=majority
JWT_SECRET=supersecretkey
EOF

# Create TypeScript entry file
cat <<'EOF' > src/index.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
EOF

# Auth routes
cat <<'EOF' > src/routes/auth.ts
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
EOF

# Admin model
cat <<'EOF' > src/models/Admin.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
EOF

# Admin routes
cat <<'EOF' > src/routes/admin.ts
import express from "express";

const router = express.Router();

router.get("/announcements", (req, res) => res.json({ message: "Announcements endpoint works" }));
router.get("/events", (req, res) => res.json({ message: "Events endpoint works" }));
router.get("/archive", (req, res) => res.json({ message: "Archive endpoint works" }));

export default router;
EOF

echo "✅ Backend setup complete!"
echo "👉 To start your backend, run:"
echo "   cd secure-backend && npx ts-node src/index.ts"
