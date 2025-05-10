import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import bookingRoute from "./routes/booking.js";
import hallsRoute from "./routes/halls.js";
import studentRoute from "./routes/student.js";

const app = express();
dotenv.config(); 

const connect = async () => {
  try {
    // await mongoose.connect(process.env.MONGO);
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("MONGO URI:", process.env.MONGO);

    console.log("Connection with mongodb database est.");
  } catch (error) {
    console.log("Connection failed");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected MongoDb");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/halls", hallsRoute);
app.use("/api/student", studentRoute);

const PORT = 3001;
app.listen(PORT, () => {
  connect();
  console.log(`Backend started on port ${PORT}`);
});


// const PORT = process.env.PORT ||  5000 // Use port from .env or fallback to 5000

// app.listen(PORT, () => {
//   connect();
//   console.log(`Backend started on port ${PORT}`);
// });
 

