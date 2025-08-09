const express = require("express");
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require("./routes/profile.routes");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const postRoutes = require("./routes/post.routes");




const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)
app.use("/api/posts",postRoutes)



module.exports = app
