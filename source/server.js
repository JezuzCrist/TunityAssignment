import express from "express";
import Routes from "./routes";
import configs from "../configs.json";

let routes = new Routes();
let server = express();

server.get('/', routes.helloWorldRoute);

server.get('/checks', routes.getChecks);
server.get('/checks/failing', routes.getFailing);
server.post('/checks/:check_name', routes.postCheck);
server.delete('/checks/:check_name', routes.deleteCheck);

server.listen(configs.server.port, function() {
    console.log(`tunity server live, listening on port ${configs.server.port}`);
});
