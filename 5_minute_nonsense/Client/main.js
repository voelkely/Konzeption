"use strict";
var Messages;
(function (Messages) {
    window.addEventListener("load", handleLoad);
    let url = "http://localhost:5500/";
    // let url = "https://fiveminutenonsense.herokuapp.com/";
    let messages = []; // Array, dass alle aktuell auf dem Canvas sichtbaren Nachrichten beinhaltet
    // let activeRocket = null; //meine globale Variable, die die RocketInstructions des aktuell geklickten Buttons hält
    
    
    //Funktionen:
    async function handleLoad(_event) {
        console.log("Start");
        // für datenbank und server:
        findMessages();
        let send = document.querySelector("button#send");
        send.addEventListener("click", sendMessage);
       
        
    }
    // Funktionen für Fromular 
    async function sendMessage(_event) {
        console.log("send Message");
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
        // console.log (formData);
        for (let entry of formData) {
            console.log(entry);
            findMessages();
        }
    }
    async function findMessages() {
        let response = await fetch(url + "?" + "command=retrieve");
        let responseText = await response.text();
        console.log(responseText + "aaaahhhhhhhhhhhh");
        showAnswers(responseText);
    }
    function showAnswers(_allSentAnswers) {
        let answers = _allSentAnswers;
        answers = JSON.parse(answers);
        // console.log(answers);
        let AnswerDiv = document.querySelector("div#AnswerDiv");
        for (let i = 0; i < answers.length; i++) { // die einzelnen Antworten aus der Serverantwort werden durchgegangen
            let currentAwenser = answers[i]; // die aktuelle Rocketinstruction wird ins Format des Interfaces "Rocketinstruction" gebracht und unter der variable currentRocket gespeichert
            let currentAwenserParagraph = document.createElement("P");
            AwenserDiv.appendChild(currentAwenserParagraph);
            currentAwenserParagraph.innerText = currentAwenser.name;            // evtl nich name??????????????? wo ist das interface??

            // currentRocketButton.addEventListener("click", () => {
            //     activeRocket = currentRocket;
            // });
        }
    }
 


})(Messages || (Messages = {}));
//# sourceMappingURL=main.js.map
