"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");

const countDate = new Date ("June23, 2030, 00:00:00");  //globale Variable die das Datum hält, von dem aus der Timer rechnet

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
        
        // if (command == "retrieve") {
            // console.log("update chat aufgerufen");
            // let allRocketInstructions = rocketInstructions.find();
            // console.log(allRocketInstructions);
            // let allRocketInstructionsString = JSON.stringify(await allRocketInstructions.toArray());
            // console.log(allRocketInstructionsString);
            // // _response.write("all saved rocket: ");

            //     let jsonString = JSON.stringify(chatMessages);
            //     _response.write(jsonString);
            //   }

            let MessageString = JSON.stringify(chatMessages);
            _response.write(MessageString);
            // let QuestionString = JSON.stringify(currentQuestion);
            // _response.write(QuestionString);
            // console.log("Nachrichten wurden abgerufen");


            // console.log(chatMessages);
            // let jsonString = JSON.stringify(chatMessages);
            // _response.write(jsonString);

            // countdown();
       // }
        // if (command == "timesup") {
            break;
            case "timesup":
        
            chatMessages.length = 0; 

            getQuestion();

            let QuestionString = JSON.stringify(currentQuestion);
            _response.write(QuestionString);

        // }
        // else {

        break;
        case "getcurrentquestion":

            console.log(" holt die alte frage");
            let OldQuestionString = JSON.stringify(currentQuestion);
            _response.write(OldQuestionString);

        // }
        // else {

        break;
        case "getid":

            ++clientIdCounter;
            let id = JSON.stringify(clientIdCounter);
            _response.write(id);

        // }
        // else {

        break;
        default: 
            // _response.write("Das ist ein response vom Server!!!!!");


            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            chatMessages.push(url.query);
            console.log("Nachricht wurde vom Server verarbeitet");

            // let url = Url.parse(_request.url, true);
            // let jsonString = JSON.stringify(url.query)
            // _response.write(jsonString);
            // chatMessages.push(jsonString);
            // console.log("Nachricht wurde vom Server verarbeitet" + url + jsonString);

        }
    }
    _response.end();
}

// //Timer / Countdown:
// function countdown ()  { 
//     // console.log("TIMER funktion gestartet")   

//     const now = new Date().getTime();
//     const gap = countDate - now;
    
// // defining time
//     const second = 1000;
//     const minute = second*60;
//     const hour = minute*60;
//     const day = hour *24;

// //calculation
//     const textDay = Math.floor(gap/day);
//     const textHour = Math.floor((gap%day) / hour);
//     const textMinute = Math.floor((gap%hour) / minute);
//     const textSecond = Math.floor((gap%minute) / second);
//     // console.log("textMinute in der calculation" + textMinute);

// //5 Minuten check

//     if (textMinute > 4 ) {
//     // console.log(countDate + " davor");
//     countDate.setMinutes(countDate.getMinutes() - 5);
//     // console.log(countDate + " neues countDate wurde gestartet");   

//     };

    
// // Wenn 5 Minuten abgelaufen sind und der Chat sich löschen soll:
    
//     if (textMinute == 0 && textSecond == 0) {
//     chatMessages.length = 0;   
//     console.log("delete Chat");
//     getQuestion();  // getQuestion Funktion soll aufgerufen werden um Frage zu generieren

//     };
    
// };

// //Timer / countdown zu Ende

function getQuestion(){
    currentQuestion.length = 0; 
    console.log("get Question"); 
    var questions = ["What if animals could talk, which would be the rudest?","What if gravity was slowly disappearing?","What if you could design a planet. What would your perfect planet look like?"];
	var question = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion.push(question);
    console.log(currentQuestion);

}
