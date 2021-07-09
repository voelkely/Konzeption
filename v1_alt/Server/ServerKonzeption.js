"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Konzeption = void 0;
const Url = require("url");
const Http = require("http");
var Konzeption;
(function (Konzeption) {
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Hallo Server");
    //*starte Server*
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    } //start server zu
    function handleRequest(_request, _response) {
        console.log("wie geht es uns heut?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            // _response.write(key + ":" + url.query[key] + "<br/>");
            //  }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    } //handleRequest zu
})(Konzeption = exports.Konzeption || (exports.Konzeption = {})); //namespace zu
//# sourceMappingURL=ServerKonzeption.js.map