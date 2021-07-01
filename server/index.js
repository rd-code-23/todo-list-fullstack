import express from "express";
import cors from "cors";
import "./db/mongoose";
import todoRouter from "./routes/todo";
import userRouter from "./routes/user";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todoRouter);
app.use('/user', userRouter);

app.get('/', (req,res) => {
    res.send('Welcome to todo-list API')
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});