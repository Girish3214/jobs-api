import dotenv from "dotenv";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import limiter from "express-rate-limit";

const app = express();
dotenv.config();

// error handler
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

// middlewares
import authenticateUser from "./middleware/authentication.js";

import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

app.set("trust proxy", 1);
app.use(
  limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);

app.use(json());
app.use(helmet());
app.use(cors());
app.use(xss());

const baseUrl = process.env.BASEURL;

// routes
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/jobs`, authenticateUser, jobsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
