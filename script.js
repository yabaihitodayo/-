// 📄 server.js (Glitchの中)
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public")); // HTMLなど置ける

io.on("connection", (socket) => {
  console.log("ユーザーが接続");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 全員に送る
  });

  socket.on("disconnect", () => {
    console.log("ユーザーが切断");
  });
});

http.listen(3000, () => {
  console.log("サーバーが起動しました（3000番ポート）");
});
