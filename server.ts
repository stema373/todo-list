import express, { Request, Response } from 'express';
const cors = require('cors');
import getUsername from './routes/getUsername';
import userExists from './routes/userExists';
import userRegistration from './routes/userRegistration';
import tasks from './routes/tasks';

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use('/getUsername', getUsername);
app.use('/userExists', userExists);
app.use('/register', userRegistration);
app.use('/tasks', tasks);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});