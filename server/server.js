import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import auth from './middleware/auth.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const port = process.env.PORT || 2023;
// console.log(process.env);
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { maxAge: 600000 },
  }),
);

app.get('/set_session', (req, res) => {
  //set a object to session
  let { username, password } = req.body;
  req.session.User = {
    username: username,
    password: password,
  };

  return res.status(200).json({ status: 'success' });
});
app.get('/get_session', (req, res) => {
  //check session
  console.log(req.session);
  if (req.session.User) {
    return res.status(200).json({ status: 'success', session: req.session.User });
  }
  return res.status(200).json({ status: 'error', session: 'No session' });
});
app.get('/verify-token', (req, res) => {
  //check session
  try {
    var token = req.query.token;
    var decode = jwt.verify(token, process.env.TOKEN_KEY);
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    return res.status(200).json({ status: 'Invalid token' });
  }
});

//destroy session
app.get('/destroy_session', (req, res) => {
  //destroy session
  req.session.destroy(function (err) {
    return res.status(200).json({ status: 'success', session: 'cannot access session here' });
  });
});
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
