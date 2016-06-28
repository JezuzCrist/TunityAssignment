export default class Routes {
    constructor() {
        console.log("routes created");
    }
    get helloWorldRoute() { return this._helloWorldRoute; }

    _helloWorldRoute(req, res) {
        res.send('Hello World!');
    }
    _postCheck(req,res){
        res.send("check added");
    }
    _deleteCheck(req,res){
        res.send("check was removed");
    }
    _getChecks(req,res){
        res.send("all checks");
    }
    _getFailing(req,res){
        res.send("faling checks");
    }
}