import configs from "../../configs.json"
import request from "request"

var expect = require("chai").expect;
let serverUrl = `http://${configs.server.adress}:${configs.server.port}`;

describe('server health check', function() {
    it('should respond to GET helloWorld from server', function(done) {
        request(serverUrl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                expect(body).to.equal("Hello World!");
                done();
            }
        })
    })
});