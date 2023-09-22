import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./mongodb/connect.js";

config();

const app = express();
const port = process.env.PORT || 443;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Define routes
app.get("/", handleRootRequest);

// Route handlers
function handleRootRequest(req, res) {
  res.send("App is in running condition");
}

// Start the server
async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
