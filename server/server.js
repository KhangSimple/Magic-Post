import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 1510;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(cors());
// Set up viewEngine
configViewEngine(app);

// Init web route
initWebRoute(app);

// Init API route

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const express = require('express')
// const app = express()

// app.get("/api", (req,res) =>
//     res.json({'users': ['user1','user2']})
// )
// PORT = 1510

// app.listen(PORT, () => {
//     console.log(`Listen from port ${PORT}`)
// })

//const express = require('express')
