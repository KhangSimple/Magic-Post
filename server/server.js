import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './middleware/auth.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 2023;
// console.log(process.env);
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(cors());
// app.use(auth);
// Set up viewEngine
configViewEngine(app);

// Init web route
initWebRoute(app);
initAPIRoute(app);
// Init API route

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// var token = jwt.sign({ foo: 'bar' }, process.env.TOKEN_KEY, { expiresIn: '1h' });
// var decoded = jwt.verify(token, process.env.TOKEN_KEY);
// console.log(token);
