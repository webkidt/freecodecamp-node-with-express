require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

let app = express();


/**
 * ? Serve a static asset
 */
app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

/**
 * ? Start with Express
 */
// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

/**
 * ? Serve an HTML file
 */
app.get('/', (req, res) => {
  let filePath = __dirname + '/views/index.html';
  res.sendFile(filePath);
});

/**
 * ? Serve JSON on a specific Route.
 * ? Use .env File.
 */
app.get('/json', (req, res) => {
  process.env.MESSAGE_STYLE === 'uppercase'
    ? res.json({ message: 'Hello json'.toUpperCase() })
    : res.json({ message: 'Hello json' });
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

/**
 * ? Get Query Parameters Input from a Client
 */
app
  .route('/name')
  .get((req, res) => {
    let {first, last} = req.query;
    res.json({name: `${first} ${last}`});
  })
  .post((req, res) => {
    let {first, last} = req.body;
    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
