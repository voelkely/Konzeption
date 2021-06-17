"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Messages;
(function (Messages) {
    let MessageContent;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5500;
    // let databaseUrl = "mongodb+srv://MyMongoDBUser:apfelbaum@eia2maike.6rcm4.mongodb.net/Potions?retryWrites=true&w=majority";
    startServer(port);
    // connectToDatabase(databaseUrl);
    // Functions:
    function startServer(_port) {
        console.log("Server starting on port:" + _port);
        let server = Http.createServer();
        console.log(server);
        console.log("blablabla")
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    // async function connectToDatabase(_url) {
    //     let options = { useNewUrlParser: true, useUnifiedTopology: true };
    //     let mongoClient = new Mongo.MongoClient(_url, options);
    //     await mongoClient.connect();
    //     rocketInstructions = mongoClient.db("Fireworks").collection("RocketInstructions");
    //     console.log("database connection ", rocketInstructions != undefined);
    // }
    async function handleRequest(_request, _response) {
        console.log("handle request");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            if (command == "retrieve") {
                console.log("retrieve message content");
                let allMessageContents = MessageContent.find();
                console.log(allMessageContents);
                let allMessageContentsString = JSON.stringify(await allMessageContents.toArray());
                console.log(allMessageContentsString);
                // _response.write("all saved rocket: ");
                _response.write(allMessageContentsString);
            }
            else {
                _response.write("This is your message: ");
                // let jsonString = JSON.stringify(url.query);
                _response.write(url.query[key]+ "<br/>")
                // _response.write(jsonString);
                _response.write("  PLEASE RELOAD THE PAGE :)");
                console.log("sent message");
                storeMessageContent(url.query);
            }
        }
        _response.end();
    }
    // function storeMessageContent(_messageContent) {
    //     console.log("store message content");
    //     MessageContent.insertOne(_messageContent);
    // }
})(Messages = exports.Messages || (exports.Messages = {}));
//# sourceMappingURL=Server.js.map