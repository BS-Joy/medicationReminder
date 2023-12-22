import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import medicationRouter from './routes/medicationRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectDB from './config/db.js'
import scheduleRouter from './routes/scheduleRoutes.js';
dotenv.config()
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/medication', medicationRouter);
app.use('/user', userRouter);
app.use('/schedule', scheduleRouter);

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => console.log(`Server is running on port: ${port} `))