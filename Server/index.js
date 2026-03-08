const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Reach");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
/**CORS (Cross-Origin Resource Sharing) ka use web development me frontend aur backend ko communicate karne ke liye hota hai jab dono alag domains / ports par chal rahe ho. */
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
//db connect
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
//req from frontend is entertained by backend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);
//cloudinary connect
cloudinaryConnect();
//routes mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

//def routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running",
  });
});
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
