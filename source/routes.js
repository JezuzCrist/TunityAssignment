import timeInMS from "ms";
import ChecksManager from "./checksManager";
import HTTPStatus from "http-status";

export default class Routes {
    constructor() {
        this._checksManager = new ChecksManager();
        console.log("routes created");
    }
    get helloWorldRoute() { return this._helloWorldRoute; }
    get getChecks() { return (req, res) => this._getChecks(req, res); }
    get postCheck() { return (req, res) => this._postCheck(req, res); }
    get deleteCheck() { return (req, res) => this._deleteCheck(req, res); }
    get getFailing() { return (req, res) => this._getFailing(req, res); }

    _helloWorldRoute(req, res) {
        res.send('Hello World!');
    }
    _postCheck(req, res) {
        let wantedCheckName = req.params.check_name;
        let checkTTL = req.query.ttl;
        if (this._isCheckNameValid(wantedCheckName) && this._isTTLValid(checkTTL)) {
            checkTTL = timeInMS(`${checkTTL}s`);
            res.send(`${wantedCheckName}-ttl(${checkTTL})-added`);
        } else {
            res.status(HTTPStatus.NOT_ACCEPTABLE).send(`incurrect input at ${wantedCheckName},${checkTTL}`);
        }
    }
    _deleteCheck(req, res) {
        let wantedCheckName = req.params.check_name;
        this._checksManager.delete(wantedCheckName)
        res.send(`${wantedCheckName}-removed`);
    }
    _getChecks(req, res) {
        res.send(this._checksManager.getAllChecks());
    }
    _getFailing(req, res) {
        res.send(this._checksManager.getFalling());
    }
    _isTTLValid(ttl) {
        try {
            if (ttl === undefined || ttl === null || parseInt(ttl) <= 0)
                return false;
            return true;
        } catch (error) {
            return false;
        }
    }
    _isCheckNameValid(check_name) {
        try {
            if (check_name === undefined || check_name === null)
                return false;
            return true;
        } catch (error) {
            return false;
        }
    }
}