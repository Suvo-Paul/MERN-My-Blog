const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const connectDB = require("./db");
const cookieParser = require('cookie-parser');

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

connectDB();

app.use("/api/auth", authRouter);
app.use("/api", postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})