const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.status(200);
});

app.listen(port, () => {
  console.log(`Address is http://localhost:3000`);
  console.log(`Listening on port ${port}`);
});
