import configs from "../configs.json"
import fs from "fs"

export default class ChecksManager {
    constructor() {
        this._checks = {};
        this._ttlTimeouts = {};
        this._checksJsonLocation = `${__dirname}/../${configs.checksFileLocation}`;
        let isChecksJsonAvalibe = fs.existsSync(this._checksJsonLocation);
        if (isChecksJsonAvalibe && process.env.NODE_ENV != "test") {
            this.loadChecks(() => {
                this._createTTLTimeoutsForAllChecks();
            });
            this._saveInterval = 20000;
            setInterval(()=> this.saveChecks(),this._saveInterval);
        }
        console.log("checksManager created");
    }
    delete(check_name) {
        delete this._checks[check_name];
        this._removeTTLTimeout(check_name);
    }
    upsert(check_name, ttl) {
        this._checks[check_name] = {
            live: true,
            ttl: ttl
        }
        this._renewTTLTimeout(check_name, ttl);
    }
    getAllChecks() {
        let returnChecks = [];
        for (let checkId in this._checks) {
            if (this._checks.hasOwnProperty(checkId)) {
                let check = {
                    name: checkId,
                    live: this._checks[checkId].live
                }
                returnChecks.push(check);
            }
        }
        return returnChecks;
    }
    getFalling() {
        let fallingChecks = [];
        for (let checkId in this._checks) {
            if (this._checks.hasOwnProperty(checkId)) {
                let check = this._checks[checkId];
                if (!check.live)
                    fallingChecks.push(checkId);
            }
        }
        return fallingChecks;
    }
    loadChecks(callback) {
        fs.readFile(this._checksJsonLocation, (err, data) => {
            if (err) throw err;
            this._checks = JSON.parse(data);
            console.log("loaded Data: ", JSON.parse(data));
            callback();
        });
    }
    saveChecks() {
        fs.writeFile(this._checksJsonLocation, JSON.stringify(this._checks), (err) => {
            if (err) throw err;
        });
    }
    _failCheck(check_name) {
        let check = this._checks[check_name];
        if (check)
            check.live = false;
    }
    _addTTLTimeout(check_name, ttl) {
        this._ttlTimeouts[check_name] = setTimeout(() => this._failCheck(check_name), ttl);
    }
    _removeTTLTimeout(check_name) {
        clearTimeout(this._ttlTimeouts[check_name]);
    }
    _renewTTLTimeout(check_name, ttl) {
        this._removeTTLTimeout(check_name);
        this._addTTLTimeout(check_name, ttl);
    }
    _createTTLTimeoutsForAllChecks() {
        for (let check_name in this._checks) {
            if (this._checks.hasOwnProperty(check_name)) {
                let check = this._checks[check_name];
                this._addTTLTimeout(check_name, check.ttl);
            }
        }
    }
}