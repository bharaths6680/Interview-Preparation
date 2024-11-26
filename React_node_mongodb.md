Let's build a **User Registration System** step by step! This challenge involves both frontend and backend development, showcasing your full-stack skills.  

---

### **Step 1: Define Requirements**
**Frontend Features**  
1. **Registration Form**: Fields for name, email, and password.  
2. **Login Form**: Fields for email and password.  
3. **Validation**: Ensure inputs meet requirements (e.g., strong passwords).  
4. **User Feedback**: Show success or error messages.  

**Backend Features**  
1. **Register User**: Save user details in the database after validation.  
2. **Login User**: Verify credentials and return a JWT for authenticated access.  
3. **Middleware**: Protect specific routes using JWT.  

---

### **Step 2: Project Structure**
**Frontend**  
- Use React.js with Create React App.  
- Install libraries:  
  ```bash
  npm install react-router-dom react-hook-form axios yup
  ```

**Backend**  
- Use Node.js with Express.  
- Install libraries:  
  ```bash
  npm install express mongoose bcryptjs jsonwebtoken body-parser cors
  ```

---

### **Step 3: Backend Development**

#### **1. Setup Express Server**
```javascript
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

---

#### **2. User Model**
```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
```

---

#### **3. Auth Routes**
```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
```

---

### **Step 4: Frontend Development**

#### **1. Setup React Project**
Install the necessary libraries and configure routes for `Register` and `Login` pages.

---

#### **2. Create Registration Form**
```javascript
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      alert("Registration Successful!");
    } catch (error) {
      alert("Registration Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
```

---

#### **3. Create Login Form**
Similar to the registration form but handles login and stores the JWT token in localStorage.  

---

### **Step 5: Run and Test**
1. Start the backend server:  
   ```bash
   node server.js
   ```
2. Start the React frontend:  
   ```bash
   npm start
   ```
3. Test the system by registering and logging in users.

---

This is a basic implementation to get started. Let me know if you’d like to expand it (e.g., adding password reset or user profile features)!
