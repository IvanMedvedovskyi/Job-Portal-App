import express from "express";

const app = express();

const PORT = 8000;

app.listen(8000, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
