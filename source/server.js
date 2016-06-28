import express from "express";
import configs from "../configs.json";


let server = express();
server.get('/', (req,res) => {
  res.send('Hello World!')
});

server.listen(configs.server.port, function () {
  console.log(`tunity server live, listening on port ${configs.server.port}`);
});
