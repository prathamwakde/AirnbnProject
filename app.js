const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require('method-override');
const flash = require("connect-flash");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// Load environment variables
dotenv.config();
const hotelRoutes = require("./routers/hotelRoutes");
const userRoutes = require("./routers/userRoutes");
const bookingRoutes = require("./routers/bookingRoutes");
const reviewRoutes = require("./routers/reviewRoutes");
const auth = require("./middleware/jwsauth");
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
// ✅ Use cookie-parser middleware
app.use(cookieParser());

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure this is correct

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash middleware
app.use(flash());

// Make user and messages available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.flash("error"); // Flash messages
  next();
});

// Routes
app.use("/", hotelRoutes);
app.use("/", userRoutes);
app.use("/", bookingRoutes);
app.use('/hotels/:hotelId/reviews', reviewRoutes);


// Redirect root to /hotels
app.get("/", (req, res) => {
  res.redirect("/hotels");
});
app.get("/test-auth", auth, (req, res) => {
  res.json({ user: req.user });
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});