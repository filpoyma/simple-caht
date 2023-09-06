const Chat = require("../models/Chat");

const wsConnect = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.on("Sent Message", (payload) => {
      const chat = new Chat({
        message: payload.message,
        sender: payload.userId,
      });
      chat.save((err, data) => {
        if (err) return;
        Chat.find({ _id: data._id })
          .populate("sender")
          .exec((err, data) => {
            return io.emit("Received Message", data);
          });
      });
    });
  });
};

module.exports = wsConnect;
