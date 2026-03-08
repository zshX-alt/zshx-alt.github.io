let skill=0

function updateSkill(v){

skill+=v

if(skill>5){
console.log("difficulty up")
}

if(skill<-5){
console.log("difficulty down")
}

}