const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
