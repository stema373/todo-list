import express, { Request, Response } from 'express';
import cors from 'cors';
import getUsername from './routes/getUsername';
import userExists from './routes/userExists';
import userRegistration from './routes/userRegistration';
import tasks from './routes/tasks';
import deleteAccount from './routes/deleteAccount';

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use('/getUsername', getUsername);
app.use('/userExists', userExists);
app.use('/register', userRegistration);
app.use('/tasks', tasks);
app.use('/deleteAccount', deleteAccount);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});