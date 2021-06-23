"use strict";
var Konzeption;
(function (Konzeption) {
    window.addEventListener("load", handleLoad);
})(Konzeption || (Konzeption = {}));
window.setTimeout(deleteChat, 300000); //Unser 5 minuten Timer 
let questions = []; //Hier stehen unsere Fragen drinnen --> Datenbank?
let chatField;
let messageField;
let modal;
let btn;
let span;
let url = "http://localhost:5001/";
//let url: string = "https://fiveminutenonsense.herokuapp.com";
function handleLoad(_event) {
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
function deleteChat() {
    console.log("animation"); //Nachdem Timer abgeaufen ist soll der Chat sich löschen /in console kommt nach 5 min "animation". Timer nicht sichtbar...
    chatField.innerHTML = "";
}
async function sendText(_event) {
    console.log("dein Text wurde gesendet");
    if (_event.key === "Enter") {
        let message = messageField.value;
        chatField.innerHTML += "<b>You: </b>" + messageField.value + "<br>";
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
//function allText();
//function likeIt();
//# sourceMappingURL=main.js.map