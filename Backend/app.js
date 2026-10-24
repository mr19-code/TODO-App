// Core Module
const path = require("path");

// External Module
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const DB_PATH = process.env.MONGODB_URI;

if (!DB_PATH) {
  console.error(
    "MONGODB_URI is not set. Copy .env.example to .env and add your MongoDB Atlas connection string.",
  );
  process.exit(1);
}

const errorsController = require("./controllers/errors");
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();
const rootDir = __dirname;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, "public")));
app.use("/api/todo", todoItemsRouter);
app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
