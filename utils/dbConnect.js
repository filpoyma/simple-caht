const mongoose = require("mongoose");

const dbConnect = () => {
  return mongoose
    .connect(process.env.dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
