const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 9000;

const phoneRoute = require("./routes/phoneBook");

//process.env.MONGO_URI ||
//mongodb connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://Sid:jBWcaYOiVj9oZw9M@cluster0.xz4rb.mongodb.net/phonebook-db?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/", express.static(path.join(__dirname, "../angular")));
app.use(cors());

app.use("/api", phoneRoute);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "../angular", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server is listing at port ${PORT}`);
});
