import express from "express";
import { connectToMongoDB } from "./db.js"; // Import the database connection function
import createuserRoutes from "./Routes/CreateUser.js"; // Import the createuser router
import loginuserRoutes from "./Routes/CreateUser.js";
import DisplayDataRoutes from "./Routes/DisplayData.js";
import OrderDataRoutes from "./Routes/OrderData.js";
import MyOrderDataRoutes from "./Routes/OrderData.js";
import dotenv from "dotenv"; // Import dotenv
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// // Enable CORS for your frontend URL
// app.use(
//   cors({
//     origin: "https://food-delivery-app-vltz.vercel.app", // Replace with your frontend URL
//     credentials: true, // Optional: include this if you need to support credentials
//   })
// );

// Enable CORS for your frontend URL
app.use(
  cors({
    origin: "https://zippy-biscochitos-6e9924.netlify.app", // Your frontend URL
    credentials: true,
  })
);

// Connect to MongoDB
connectToMongoDB();

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://zippy-biscochitos-6e9924.netlify.app"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Hi Mukund");
});

// Use the createuser router with a base path of "/api"
app.use("/api", createuserRoutes);

app.use("/api", loginuserRoutes);

app.use("/api", DisplayDataRoutes);

app.use("/api", OrderDataRoutes);

app.use("/api", MyOrderDataRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
