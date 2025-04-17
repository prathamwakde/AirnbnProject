const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP CONTROLLER
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists. Try logging in.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Set session and redirect
    req.session.user = user;
    res.redirect("/hotels");

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("Error signing up.");
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found. Please sign up.");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials.");
    }

    // Set session and redirect
    req.session.user = user;
    res.redirect("/hotels");

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Login error.");
  }
};

// LOGOUT CONTROLLER
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
