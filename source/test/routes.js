import configs from "../../configs.json"
import request from "request"

var expect = require("chai").expect;
let serverUrl = `http://${configs.server.adress}:${configs.server.port}`;

let checksUrl = "/checks";
describe(`GET: ${checksUrl}`, function() {
    describe('get checks ', function() {
        it(`should respond to GET  ${checksUrl} from server`, function(done) {
            request(`${serverUrl}${checksUrl}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let checks = {};
                    expect(body).to.equal(JSON.stringify(checks));
                    done();
                }
            })
        })
    });
})

let fallingUrl = "/checks/failing";
describe(`GET: ${fallingUrl}`, function() {
    describe('get checks ', function() {
        it(`should respond to GET  ${fallingUrl} from server`, function(done) {
            request(`${serverUrl}${fallingUrl}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let checks = {};
                    expect(body).to.equal(JSON.stringify(checks));
                    done();
                }
            })
        })
    });
})

let deleteCheckUrl = "/checks/";
let deleteCheck = (checkName) => {
    let checkId = checkName;
    let deleteUrl = `${deleteCheckUrl}${checkId}`;
    it(`should respond to ${deleteUrl} from server`, function(done) {
        request.delete(`${serverUrl}${deleteUrl}`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let responseMessage = `${checkId}-removed`;
                expect(body).to.equal(responseMessage);
                done();
            }
        })
    })
}
describe(`DELETE: ${deleteCheckUrl}:check_name:`, function() {
    describe('remove checks ', function() {
        deleteCheck("thisIsATestCheck");
        deleteCheck("TtestingIsFun");
        deleteCheck("haveAniceDay");
    });
})

let postCheckUrl = "/checks/";
let postCheck = (checkName) => {
    let checkId = checkName;
    let deleteUrl = `${postCheckUrl}${checkId}`;
    it(`should respond to ${deleteUrl} from server`, function(done) {
        request.post(`${serverUrl}${deleteUrl}`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let responseMessage = `${checkId}-added`;
                expect(body).to.equal(responseMessage);
                done();
            }
        })
    })
}
describe(`POST: ${postCheckUrl}:check_name:?:ttl_in_seconds:`, function() {
    describe('add checks ', function() {
        postCheck("thisIsATestCheck");
        postCheck("TtestingIsFun");
        postCheck("haveAniceDay");
    });
})
