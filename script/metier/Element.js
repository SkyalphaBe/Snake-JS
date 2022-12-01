import {oldScore} from "./game.js";
const sizeBoard = document.querySelector("input[type=range]");
const menu = document.getElementById("myModal");

/**
 * méthode pour créer et insérer dans le DOM le header ainsi que le footeur
 * @returns {HTMLElement[]} revoie les nouveaux element créer Header et Footer
 */
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

/**
 * Méthode pour créer le canvas et l'insérer dans le DOM
 */
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

/**
 * Méthode pour supprimer le header et le footer du DOM
 */
function deleteHeadFoot(){
    document.querySelector(".header").remove();
    document.querySelector(".footer").remove();
}

/**
 * Méthode pour supprimer le canvas du DOm
 */
function deleteCanvas(){
    document.querySelector("canvas").remove();
}

/**
 * Méthode pour créer et insérer le pop_up GAMEOVER dans le DOM
 */
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

    /**
     * Listener pour revenir au menu principale ainsi que supprimer les élèments de la page de jeux du DOM
     */
    newGO.querySelector(".btn").addEventListener("click",()=>{
        newGO.remove();
        deleteHeadFoot();
        deleteCanvas();
        menu.style.display="block";

    });
    document.getElementsByTagName("body")[0].insertBefore(newGO,document.querySelector("script"));
}

export {createCanvas,createGameOver,createHeadFoot,deleteCanvas,deleteHeadFoot,sizeBoard,menu};