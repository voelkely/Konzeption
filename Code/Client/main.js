"use strict";



var Konzeption;
(function (Konzeption) {
    window.addEventListener("load", handleLoad);


const countDate = new Date ("June23, 2030, 00:00:00");  //globale Variable die das Datum hält, von dem aus der Timer rechnet

let chatDiv;
let messageField;
let id = null;
let idDiv;
let modal;
let btn;
let span;
//let url = "http://localhost:5502/";
let url = "https://fiveminutenonsense.herokuapp.com";

function handleLoad(_event) {
   
    setInterval(updateChat,100); // soll jede sekunde die neuesten chat-nachrichten laden
    setInterval(countdown, 100);   // Interval, das jede Sekunde den Timer aktualisiert (countdown funktion steht im Dokument ganz unten)

    
    console.log("start the chat");
    chatDiv = document.querySelector(".chatfield");
    messageField = document.getElementById("message");
    messageField.addEventListener("keyup", sendText); //input

    getcurrentquestion ();
    getId ();

    //modal zeug
    modal = document.getElementById("myModal");
    btn = document.getElementById("Help");
    btn.onclick = function () {
        modal.style.display = "block";
    };
    span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    };
} //handleLoad zu

//MODAL Für den Help Button
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


function deleteChat() {
    console.log("deleteChat"); //Nachdem Timer abgeaufen ist soll der Chat sich löschen 
    chatDiv = document.querySelector(".chatfield");
    chatDiv.innerHTML = "";

}

async function sendText(_event) {

    messageField = document.getElementById("message");

    if (_event.key === "Enter") {
        let message = messageField.value;

        console.log("dein Text wird gesendet ");
        sendMessageToServer(id + ": " + message);
    }
}
async function sendMessageToServer(_message) {
        console.log(_message);
    
        let query = new URLSearchParams(_message);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();       
        console.log(responseText + " kam vom server i guess");
        messageField.value = "";

    }


async function updateChat(){
        let response = await fetch(url + "?" + "command=retrieve");
        let responseText = await response.text();
        // console.log(responseText + "  ressponse texttt");
        let allMessages = JSON.parse(responseText);
        // let allMessagesX = allMessages[0].toString();
        console.log(allMessages +" alllllle nachrichtennnn");
        chatDiv = document.querySelector(".chatfield");
        chatDiv.innerHTML = "";

        for (let i = 0; i < allMessages.length; i++) { // die einzelnen Messages aus der Serverantwort werden durchgegangen

            let currentMessage = allMessages[i];
            let currentMessageClocked = JSON.stringify(currentMessage);
            let currentMessageP = document.createElement("p");
            chatDiv.appendChild(currentMessageP);
            currentMessageClocked = currentMessageClocked.slice(2);
            currentMessageClocked = currentMessageClocked.slice(0, currentMessageClocked.length - 5);


            currentMessageP.innerText =  currentMessageClocked;

 
            // var scroll= chatDiv;
            // scroll.scrollTop = scroll.scrollHeight;

        }
    }

    
    
 //Timer / Countdown:
    
    const countdown = () => {
        const now = new Date().getTime();
        const gap = countDate - now;
        
    // defining time
        const second = 1000;
        const minute = second*60;
        const hour = minute*60;
        const day = hour *24;

    //calculation
        const textDay = Math.floor(gap/day);
        const textHour = Math.floor((gap%day) / hour);
        const textMinute = Math.floor((gap%hour) / minute);
        const textSecond = Math.floor((gap%minute) / second);
        // console.log("textMinute" + textMinute);

    //5 Minuten check
        if (textMinute > 4 ) {
        // console.log(countDate + " davor");
        countDate.setMinutes(countDate.getMinutes() - 5);
        // console.log(countDate + " neu");          
        };

    //Ausgabe des Timers ins html dokument
    
        // document.querySelector(".day").innerText = textDay;
        // document.querySelector(".hour").innerText = textHour;
        document.querySelector(".minute").innerText = textMinute;
        document.querySelector(".second").innerText = textSecond;
        
    // Wenn 5 Minuten abgelaufen sind und der Chat sich löschen soll:
        
        if (textMinute == 0 && textSecond == 0) {
        deleteChat();    
        // console.log("delete Chat");
        timesUp();  // Funktion soll aufgerufen werden um Frage zu generieren

        };
        
    };
    
//Timer / countdown zu Ende

async function timesUp (){

    let response = await fetch(url + "?" + "command=timesup");
    let responseText = await response.text();
    console.log(responseText + "  ressponse texttt");
    // let currentQuestion = JSON.stringify(responseText);

    console.log(responseText);
    responseText = responseText.slice(2);
    responseText = responseText.slice(0, responseText.length - 2);

    let questionField = document.querySelector(".question");
    questionField.innerText = responseText; 

}
async function getcurrentquestion (){

    let response = await fetch(url + "?" + "command=getcurrentquestion");
    let responseText = await response.text();
    console.log(responseText + "  ressponse texttt");
    // let currentQuestion = JSON.stringify(responseText);

    // console.log("die aktuelle frage sollte geladen sein")
    responseText = responseText.slice(2);
    responseText = responseText.slice(0, responseText.length - 2);

    let questionField = document.querySelector(".question");
    questionField.innerText = responseText; 

}
async function getId (){

    let response = await fetch(url + "?" + "command=getid");
    let responseText = await response.text();

    id = responseText;
    idDiv = document.getElementById("id");
    idDiv.innerText = "#" + responseText; 
    console.log("deine ID ist " + id);

}
    

//function allText();
//function likeIt();
//# sourceMappingURL=main.js.map
    
   })(Konzeption || (Konzeption = {}));
