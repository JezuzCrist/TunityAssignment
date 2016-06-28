export default class Routes {
    constructor() {
        console.log("routes created");
    }
    get helloWorldRoute() { return this._helloWorldRoute; }

    _helloWorldRoute(req, res) {
        res.send('Hello World!');
    }
}