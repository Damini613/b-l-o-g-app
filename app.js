const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const connectDB = require("./db/mongoose");
const router = require("./routes/blogs");
connectDB();
app.use(cors());

const PORT = process.env.PORT || 8000;

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`port is listening ${PORT}`);
});
