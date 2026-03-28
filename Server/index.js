const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Reach");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { connectRedis } = require("./config/redis");

const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

//  start server properly
const startServer = async () => {
  try {
    await database.connect();
    await connectRedis();
    cloudinaryConnect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server start failed", error);
  }
};

startServer();
