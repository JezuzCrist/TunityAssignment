import configs from "../../configs.json"
import request from "request"
import HTTPStatus from "http-status"
import timeInMS from "ms"

var expect = require("chai").expect;
let serverUrl = `http://${configs.server.adress}:${configs.server.port}`;

let checksUrl = "/checks";
let getChecks = (expectedChecks) => {
    it(`should respond to ${checksUrl} from server`, function(done) {
        request.get(`${serverUrl}${checksUrl}`, (error, response, body) => {
            if (!error && response.statusCode == HTTPStatus.OK) {
                expect(body).to.equal(JSON.stringify(expectedChecks));
                done();
            }
        })
    })
}

describe(`GET: ${checksUrl}`, function() {
    describe('get checks', function() {
        getChecks([]);
    });
})

let checksFailingUrl = "/checks/failing";
let getFailingChecks = (expectedChecks) => {
    it(`should get ${checksFailingUrl} from server`, function(done) {
        request.get(`${serverUrl}${checksFailingUrl}`, (error, response, body) => {
            if (!error && response.statusCode == HTTPStatus.OK) {
                expect(body).to.equal(JSON.stringify(expectedChecks));
                done();
            }
        })
    })
}

describe(`GET: ${checksFailingUrl}`, function() {
    describe('get checks', function() {
        getFailingChecks([]);
    });
})

let postCheckUrl = "/checks/";
let postCheck = (checkName, ttl) => {
    let checkId = checkName;
    let postUrl = `${postCheckUrl}${checkId}?ttl=${ttl}`;
    it(`should post ${postUrl} from server`, function(done) {
        request.post(`${serverUrl}${postUrl}`, (error, response, body) => {
            if (!error && response.statusCode == HTTPStatus.OK) {
                let responseMessage = `${checkId}-ttl(${timeInMS(`${ttl}s`)})-added`;
                expect(body).to.equal(responseMessage);
                done();
            }
        })
    })
}
describe(`POST: ${postCheckUrl}:check_name:?:ttl_in_seconds:`, function() {
    describe('add checks ', function() {
        postCheck("thisIsATestCheck", 10);
        postCheck("TtestingIsFun", 20);
        postCheck("haveAniceDay", 10);
    });
})

let deleteCheckUrl = "/checks/";
let deleteCheck = (checkName) => {
    let checkId = checkName;
    let deleteUrl = `${deleteCheckUrl}${checkId}`;
    it(`should delete ${deleteUrl} from server`, function(done) {
        request.delete(`${serverUrl}${deleteUrl}`, (error, response, body) => {
            if (!error && response.statusCode == HTTPStatus.ACCEPTED) {
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





describe(`Behavior test`, function() {
    describe(`Posting a check to ${postCheckUrl}:check_name:, and getting/removeing it from ${checksUrl}`, function() {
        let check_name = "haveAniceDay";
        let ttl = 150;
        getChecks([]);
        postCheck(check_name, ttl);
        getChecks([{ name: check_name, live: true }]);
        deleteCheck(check_name);

    });
})