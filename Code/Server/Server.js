"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");


let chatMessages = [];
let currentQuestion =["Platzhalter Question"];
let clientIdCounter = 0;


let port = process.env.PORT;
    if (port == undefined)
        port = 5502;

startServer(port);



function startServer(_port) {
    console.log("Server starting on port:" + _port);
    let server = Http.createServer();
    // console.log(server);
    server.listen(_port);
    server.addListener("request", handleRequest);

}

async function handleRequest(_request, _response) {
    // console.log("handle request");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        let command = url.query["command"];

        switch (command) {
            case "retrieve":
       
            let MessageString = JSON.stringify(chatMessages);
            _response.write(MessageString);
            
        break;
            case "timesup":
        
            chatMessages.length = 0; 

            getQuestion();

            setTimeout(function() {
                let QuestionString = JSON.stringify(currentQuestion);
                _response.write(QuestionString);
            }[500]);


        break;
        case "getcurrentquestion":

            console.log(" holt die alte frage");
            let OldQuestionString = JSON.stringify(currentQuestion);
            _response.write(OldQuestionString);


        break;
        case "getid":

            ++clientIdCounter;
            let id = JSON.stringify(clientIdCounter);
            _response.write(id);

        break;
        default: 

            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            chatMessages.push(url.query);
            console.log("Nachricht wurde vom Server verarbeitet");

        }
    }
    _response.end();
}


function getQuestion(){
    currentQuestion.length = 0; 
    console.log("get Question"); 
    var questions = ["What if animals could talk, which would be the rudest?","What if gravity was slowly disappearing?","What if you could design a planet. What would your perfect planet look like?"];
	var question = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion.push(question);
    console.log(currentQuestion);

}
