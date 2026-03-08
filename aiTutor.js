function openSensei(){

document.getElementById("app").innerHTML=`
<div id="chatbox"></div>
<input id="msg">
<button onclick="sendMsg()">Send</button>
`

}

function sendMsg(){

let input=document.getElementById("msg").value
let chat=document.getElementById("chatbox")

chat.innerHTML+=`<p>You: ${input}</p>`

let reply=senseiReply(input)

chat.innerHTML+=`<p>Sensei: ${reply}</p>`

}

function senseiReply(text){

if(text.includes("行く")){
return "Hmph… gunakan partikel に. Contoh: 東京に行きます"
}

if(text.includes("勉強")){
return "Bagus. Sekarang buat kalimat dengan 明日."
}

return "Kalimatmu menarik. Coba gunakan grammar JLPT N4."
}