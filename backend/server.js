import express from "express";
import dotenv from "dotenv";
import cnntDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is up..!");
});

cnntDb();

app.use('/auth/user', userRoutes)
app.use('/auth/project', adminRoutes)
app.use('/auth/project', memberRoutes)

app.listen(process.env.PORT, () =>
  console.log(`server is up and running on port:http://localhost:${process.env.PORT}`)
);
