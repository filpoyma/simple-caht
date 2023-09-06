const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/chatsobes";

const dbConnect = () => {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
