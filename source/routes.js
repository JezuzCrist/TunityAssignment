export default class Routes {
    constructor() {
        console.log("routes created");
    }
    get helloWorldRoute() { return this._helloWorldRoute; }
    get getChecks() { return this._getChecks; }
    get postCheck() { return this._postCheck; }
    get deleteCheck() { return this._deleteCheck; }
    get getFailing() { return this._getFailing; }

    _helloWorldRoute(req, res) {
        res.send('Hello World!');
    }
    _postCheck(req, res) {
        let wantedCheckId = req.params.check_name;
        res.send(`${wantedCheckId}-added`);
    }
    _deleteCheck(req, res) {
        let wantedCheckId = req.params.check_name;
        res.send(`${wantedCheckId}-removed`);
    }
    _getChecks(req, res) {
        res.send({});
    }
    _getFailing(req, res) {
        res.send({});
    }
}