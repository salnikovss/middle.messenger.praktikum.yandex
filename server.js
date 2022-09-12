const express = require('express');

const app = express();
const PORT = 3000;

const staticDir = `${__dirname}/static/`;
app.use(express.static(staticDir));

// Serve dist folder with routing
// const distDir = `${__dirname}/dist/`;
// app.use(express.static(distDir));
// app.get('/*', function (req, res) {
//   res.sendFile(`${distDir}/index.html`);
// });

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
