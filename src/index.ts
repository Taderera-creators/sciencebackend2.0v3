import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logInRouter } from "./routes/log-in";
import { userDetailsRouter } from "./routes/user-details";
import { ArticlesRouter } from "./routes/articles";
import { FeedbackRouter } from "./routes/feedbacks";




require("dotenv").config();

import * as dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user-details", userDetailsRouter);
app.use("/log-in", logInRouter);
app.use("/articles", ArticlesRouter);
app.use("/feedback",FeedbackRouter)


///const port =   process.env.URL || "mongodb://localhost:27017"
mongoose.connect(
  process.env.URL
 //port
//"mongodb://localhost:27017"
 
 
);






//leaving autoIndex to true cause a signficant poor perfomance
app.listen(8000, () => {
  console.log("server running");
});

