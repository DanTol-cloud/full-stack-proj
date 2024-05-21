import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from "./routes/users.js"
import {albumRouter} from "./routes/albums.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/albums", albumRouter);

mongoose.connect(
    "mongodb+srv://daniil:dmft1711iowa2001@app.ff70lmn.mongodb.net/App?retryWrites=true&w=majority"
)

app.listen(3001, () => {
    console.log("SERVER STARTED");
});
