import express from "express";
import cors from "cors";
import "./db/mongoose";
import todoRouter from "./routes/todo";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todoRouter)

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});