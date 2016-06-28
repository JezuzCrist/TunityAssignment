import express from "express";
import Routes from "./routes";
import configs from "../configs.json";

let routes = new Routes();
let server = express();

server.get('/', routes.helloWorldRoute);

server.listen(configs.server.port, function() {
    console.log(`tunity server live, listening on port ${configs.server.port}`);
});
