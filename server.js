const express = require('express');

const app = express();
const PORT = 3000;

const distDir = `${__dirname}/dist/`;

app.use(express.static(distDir));

app.get('/*', function (req, res) {
  res.sendFile(`${distDir}/index.html`);
});

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Listening on port ${PORT}!`);
});
