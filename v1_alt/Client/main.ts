namespace Konzeption {

    window.addEventListener("load", handleLoad);

}

window.setTimeout(deleteChat, 300000); //Unser 5 minuten Timer 

let questions: string[] = [];  //Hier stehen unsere Fragen drinnen --> Datenbank?

let chatField: HTMLInputElement;
let messageField: HTMLInputElement;
let modal: HTMLElement;
let btn: HTMLButtonElement;
let span: HTMLSpanElement;


let url: string = "http://localhost:5001/";
//let url: string = "https://fiveminutenonsense.herokuapp.com";

function handleLoad(_event: Event): void {

    console.log("start the chat");

    chatField = <HTMLInputElement>document.querySelector(".chatfield");
    //hier sollte text im div angezeigt werden //lila

    messageField = <HTMLInputElement>document.getElementById("message");
    messageField.addEventListener("keyup", sendText); //input

    modal = <HTMLElement>document.getElementById("myModal");
    
    btn = <HTMLButtonElement>document.getElementById("Help");
    btn.onclick = function(): void {
        modal.style.display = "block";
    };

    span = <HTMLSpanElement>document.getElementsByClassName("close")[0];
    span.onclick = function(): void {
        modal.style.display = "none";
    };

}//handleLoad zu


//MODAL Für den Help Button
window.onclick = function(event: MouseEvent): void {
    if (event.target == modal) {
    modal.style.display = "none";
  }
};


function deleteChat(): void {
    console.log("animation"); //Nachdem Timer abgeaufen ist soll der Chat sich löschen /in console kommt nach 5 min "animation". Timer nicht sichtbar...
    chatField.innerHTML = "";
}


async function sendText(_event: KeyboardEvent): Promise<void> {

    console.log("dein Text wurde gesendet");
    if (_event.key === "Enter") {
        let message: string = messageField.value;
        chatField.innerHTML += "<b>You: </b>" + messageField.value + "<br>";
        messageField.value = "";
        console.log("du hast enter gedrückt");
        sendMessageToServer(message);

    }
}

//function getText(_event: MouseEvent): void {
// console.log("hier ist dein Text");
//}

interface ClientMessage {
    client: number;
    text: string;
}

async function sendMessageToServer(text: string): Promise <void> {
    console.log(text);
    if (text !== null && text.length > 0) {
        const data: ClientMessage = {
            client: 10,
            text: text
        };
        let query: URLSearchParams = new URLSearchParams(<any>data);
        let response: Response = await fetch(url + "/save?" + query.toString());
        let responseJSON: any = await response.json();
        console.log(await responseJSON);

    }
}








//function allText();


//function likeIt();




