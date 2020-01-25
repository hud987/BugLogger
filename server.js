const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//const bodyParser = require('body-parser');

const items = require('./routes/api/items')
const projects = require('./routes/api/projects')
const tickets = require('./routes/api/tickets')
const users = require('./routes/api/users')

const app = express();

//app.use(bodyParser.json());
//app.use(cors());
app.use(express.json())

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongodb...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/projects', projects);
app.use('/api/tickets', tickets);
app.use('/api/users', users);

// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))