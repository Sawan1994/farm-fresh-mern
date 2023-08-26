const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(500)
    .json({ message: 'Hello from express!!!', app: 'Farm Fresh | MERN' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
