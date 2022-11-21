const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName('close')[0];
const startBtn = document.getElementById("startBtn");
const content = document.getElementById("game");
const header = document.getElementById("head");

console.log(content);

window.onload = function(){
    modal.style.display="block";
}

startBtn.onclick = function(){
    modal.style.display="none";
    header.style.display="flex";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display=none;
    }
}
