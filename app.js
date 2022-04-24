const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const connectDB = require("./db/mongoose");
const router = require("./routes/blogs");
connectDB();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 8000;

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`port is listening ${PORT}`);
});
