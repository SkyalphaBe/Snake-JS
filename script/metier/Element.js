import {oldScore} from "./game.js";
const sizeBoard = document.querySelector("input[type=range]");
const menu = document.getElementById("myModal");

function createHeadFoot(){
    let newHead = document.createElement("section");
    let newTitle = document.createElement("h1");
    let newFoot = document.createElement("section");
    let newScore = document.createElement("h2");
    let newFruit = document.createElement("div");
    let newImg = document.createElement("img");
    let newFruitManger = document.createElement("h2");
    let newHighScore = document.createElement("h2");

    newHead.id="head";
    newHead.className="header";

    newTitle.textContent="SNAKE!";

    newHead.appendChild(newTitle);

    newFoot.id="foot";
    newFoot.className="footer";

    newScore.textContent="Score : 0";

    newFruit.id="fruit";
    newFruit.className="nbFruit";

    newImg.id="apple";
    newImg.src="./Image/apple.png";
    newImg.alt="apple";

    newFruitManger.textContent=" 0";

    newFoot.appendChild(newScore);
    newFoot.appendChild(newFruit);
    newFruit.appendChild(newImg);
    newFruit.appendChild(newFruitManger);

    if(oldScore.getHighScore() != 0){
        newHighScore.id="highScore"
        newHighScore.textContent="High Score : "+oldScore.getHighScore()*100;
        newFoot.appendChild(newHighScore);
    }

    document.getElementsByTagName("body")[0].insertBefore(newHead,menu);
    document.getElementsByTagName("body")[0].insertBefore(newFoot,document.querySelector("script"));

    return [newHead,newFoot];
}

function createCanvas(){
    let newC = document.createElement("canvas");
    newC.id="snakeGame";
    if(sizeBoard.value==2){
        newC.height = "700";
        newC.width = "700";
    }
    else {
        newC.height = "500";
        newC.width = "500";
    }
    document.getElementsByTagName("body")[0].insertBefore(newC,menu);
}

function deleteHeadFoot(){
    document.querySelector(".header").remove();
    document.querySelector(".footer").remove();
}

function deleteCanvas(){
    document.querySelector("canvas").remove();
}

function createGameOver(){
    var newGO = document.createElement("div");
    let newGOcontent = document.createElement("div");
    let newH1 = document.createElement("h1");
    let newBtn = document.createElement("button");

    newGO.id="gameOver";
    newGO.className="GAMEOVER";

    newGOcontent.className="GAMEOVER-content";

    newH1.textContent="GAME OVER";

    newBtn.id="menuBtn";
    newBtn.className="btn";
    newBtn.textContent="MENU";

    newGO.appendChild(newGOcontent);
    newGOcontent.appendChild(newH1);
    newGOcontent.appendChild(newBtn);

    newGO.querySelector(".btn").addEventListener("click",()=>{
        newGO.remove();
        deleteHeadFoot();
        deleteCanvas();
        menu.style.display="block";

    });
    document.getElementsByTagName("body")[0].insertBefore(newGO,document.querySelector("script"));
}

export {createCanvas,createGameOver,createHeadFoot,deleteCanvas,deleteHeadFoot,sizeBoard,menu};