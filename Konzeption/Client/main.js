"use strict";
var Konzeption;
(function (Konzeption) {
    window.addEventListener("load", handleLoad);

//window.setTimeout(deleteChat, 300000); //Unser 5 minuten Timer --> wird glaub nicht mehr gebraucht
const countDate = new Date ("June23, 2030, 00:00:00");  //globale Variable die das Datum hält, von dem aus der Timer rechnet
var questions = ["What if animals could talk, which would be the rudest?","What if gravity was slowly disappearing?","What if you could design a planet. What would your perfect planet look like?"];
var question;
let chatField;
let messageField;
let modal;
let btn;
let span;
let url = "http://localhost:5001/";
//let url: string = "https://fiveminutenonsense.herokuapp.com";
function handleLoad(_event) {
    
    setInterval(countdown, 100);   // Interval, das jede Sekunde den Timer aktualisiert (countdown funktion steht im Dokument ganz unten)
    getQuestion();  // getQuestion Funktion soll aufgerufen werden um Frage zu generieren
    
    console.log("start the chat");
    chatField = document.querySelector(".chatfield");
    //hier sollte text im div angezeigt werden //lila
    messageField = document.getElementById("message");
    messageField.addEventListener("keyup", sendText); //input
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

function getQuestion() {
    console.log("get Question"); 
	question = questions[Math.floor(Math.random() * questions.length)];
    document.querySelector(".question").innerText = question;
    
}
function deleteChat() {
    console.log("animation"); //Nachdem Timer abgeaufen ist soll der Chat sich löschen /in console kommt nach 5 min "animation". Timer nicht sichtbar...
    chatField.innerHTML = "";
	getQuestion();
}
async function sendText(_event) {
    console.log("dein Text wurde gesendet");
    if (_event.key === "Enter") {
        let message = messageField.value;
        chatField.innerHTML += "<p>" + "You: " + messageField.value + "</p>";
        messageField.value = "";
        console.log("du hast enter gedrückt");
        sendMessageToServer(message);
    }
}
async function sendMessageToServer(text) {
    console.log(text);
    if (text !== null && text.length > 0) {
        const data = {
            client: 10,
            text: text
        };
        let query = new URLSearchParams(data);
        let response = await fetch(url + "/save?" + query.toString());
        let responseJSON = await response.json();
        console.log(await responseJSON);
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
        console.log("delete Chat");
        };
        
    };
    
//Timer / countdown zu Ende
    

//function allText();
//function likeIt();
//# sourceMappingURL=main.js.map
    
    })(Konzeption || (Konzeption = {}));
