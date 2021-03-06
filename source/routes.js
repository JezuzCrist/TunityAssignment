import timeInMS from "ms";
import ChecksManager from "./checksManager";
import HTTPStatus from "http-status";

export default class Routes {
    constructor() {
        this._checksManager = new ChecksManager();
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
            this._checksManager.upsert(wantedCheckName, checkTTL);
            res.send(`${wantedCheckName}-ttl(${checkTTL})-added`);
        } else {
            res.status(HTTPStatus.NOT_ACCEPTABLE).send(`incurrect input at ${wantedCheckName},${checkTTL}`);
        }
    }
    _deleteCheck(req, res) {
        let wantedCheckName = req.params.check_name;
        if (this._isCheckNameValid(wantedCheckName)) {
            this._checksManager.delete(wantedCheckName);
            res.status(HTTPStatus.ACCEPTED).send(`${wantedCheckName}-removed`);
        } else {
            res.status(HTTPStatus.NOT_ACCEPTABLE).send(`incurrect input at ${wantedCheckName}`);
        }
    }
    _getChecks(req, res) {
        res.send(this._checksManager.getAllChecks());
    }
    _getFailing(req, res) {
        res.send(this._checksManager.getFalling());
    }
    _isTTLValid(ttl) {
        try {
            if (!ttl || isNaN(ttl) || parseInt(ttl) <= 0)
                return false;
            return true;
        } catch (error) {
            return false;
        }
    }
    _isCheckNameValid(check_name) {
        try {
            if (!check_name)
                return false;
            return true;
        } catch (error) {
            return false;
        }
    }
}