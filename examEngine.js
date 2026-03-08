function startExam(){

let time=600
let score=0

document.getElementById("app").innerHTML=`
<h2>JLPT Practice</h2>
<div id="timer"></div>

<p>「予定」の読み方は？</p>

<input id="examAns">
<button onclick="submitExam()">Submit</button>
`

setInterval(()=>{
time--
document.getElementById("timer").innerText="Time: "+time
},1000)

}

function submitExam(){

let ans=document.getElementById("examAns").value

if(ans=="よてい"){
alert("Correct")
}else{
alert("Wrong")
}

}