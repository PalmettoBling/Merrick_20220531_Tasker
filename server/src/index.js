const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./public/api/routes');
const db = require('./cosmos');

// Using CosmosDB Emulator, this is to disable TLS verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const root = './';
const port = process.env.PORT || '3000';
const app = express();

db.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'client/tasks/dist/tasks')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('client/tasks/dist/tasks/index.html', {root});
});

app.listen(port, () => console.log(`API running on localhost:${port}`));