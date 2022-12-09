const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, "/index.html"));
});

app.get("/dog-log", (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "/dog-log/dog-log.html"));
});

app.get("/dog-log.js", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, "/dog-log/dog-log.js"));
});
app.get("/dog-log/dog-log.txt", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, "/dog-log/dog-log.txt"));
});

app.get("/dog-log-styles.css", (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "/dog-log/dog-log-styles.css"));
});

app.get("/images/background.png", (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "/images/background.png"));
});

app.get("/index.js", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, "/index.js"));
});

app.get("/styles.css", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, "/styles.css"));
});

app.get("/delete", (req, res, next) => {
  fs.unlink("dog-log/dog-log.txt", function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });

  return res.status(200);
});

app.post("/favDog", (req, res, next) => {
  req.on("data", function (img) {
    fs.appendFileSync("dog-log/dog-log.txt", img);
  });
  return res.status(201);
});

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
