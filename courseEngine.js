async function openCourse(){

const res = await fetch("data/jlpt_n4_course.json")
const data = await res.json()

let html="<h2>"+data.course+"</h2>"

data.chapters.forEach(ch=>{

 html+=`<h3>${ch.title}</h3>`

 ch.lessons.forEach(ls=>{
 html+=`
 <div>
 <b>${ls.title}</b><br>
 Grammar: ${ls.grammar}
 <br>
 <button onclick="startQuiz('${ls.quiz.question}','${ls.quiz.answer}')">
 Start
 </button>
 </div>
 `
 })

})

document.getElementById("app").innerHTML=html

}

function startQuiz(q,a){

document.getElementById("app").innerHTML=`
<h3>${q}</h3>
<input id="answer">
<button onclick="checkAnswer('${a}')">Submit</button>
`

}

function checkAnswer(ans){

let user=document.getElementById("answer").value

if(user==ans){
alert("Correct")
updateSkill(1)
}else{
alert("Wrong")
updateSkill(-1)
}

}