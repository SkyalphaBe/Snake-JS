const btnStart = document.getElementById("startBtn");
const ModalGameOver = document.getElementsByClassName("GAMEOVER")[0];
const menu = document.getElementById("myModal");
const vitesse = document.querySelectorAll("input[type=radio]");
const head = document.getElementById("head");
const appleCanva = document.getElementById("appleCanva");
const goBack = document.getElementById("menuBtn");

var context;
var longueurBlock;
var largeurBlock;
var score;
var nbFruit;
var apple;
/* var cloneMenu = menu.cloneNode(true); */


btnStart.addEventListener("click",startGame);
/* cloneMenu.querySelector("button").addEventListener("click",startGame); */

function startGame(){
    createHeadFoot();
    createCanvas();
    menu.style.display="none";
    /* cloneMenu.remove(); */

    var plateau = document.getElementById("snakeGame");
    context = snakeGame.getContext("2d");

    var canvaHeight = plateau.height;
    var canvaWidth = plateau.width;

    longueurBlock = canvaWidth/monde.length;
    largeurBlock = canvaHeight/monde.length;

    score = document.getElementById("foot").children.item(0);
    nbFruit = document.getElementById("fruit").children.item(1);
    apple = document.getElementById('apple');

    snake = new Snake();
    fruit = new Fruit();
    dessinerMonde();
    if(isCheck(vitesse) != null){
        step();
    }
}

var fruit;
var snake;
var time;




var monde = [
    [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
    [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]],
    [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]],
    [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9]],
    [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]],
    [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]],
    [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9]],
    [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9]],
    [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]],
    [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]],
];




function dessinerMonde(){
    context.fillStyle ='#DDD5D0';
    monde.forEach(ligne=>{
        ligne.forEach(cellule=>{
             context.fillRect(cellule[0]*longueurBlock,cellule[1]*largeurBlock, longueurBlock, largeurBlock);
        });
       
    });
}

//fonction permettant le dessin d'une partie du tete
function dessinerCorps(position){
    context.fillStyle = 'blue';
    context.fillRect(position[0]*longueurBlock, position[1]*largeurBlock, longueurBlock, largeurBlock);
}

document.addEventListener('keydown',(evt)=>{
    switch(evt.key){
        case 'ArrowUp':
            if(snake.direction!='bas'){
                snake.direction='haut';
            }
            break;
        case 'ArrowDown':
            if(snake.direction!='haut'){
                snake.direction='bas';
            }
            break;
        case 'ArrowLeft':
            if(snake.direction!='droite'){
                snake.direction='gauche';
            }
            break;
        case 'ArrowRight':
            if(snake.direction!='gauche'){
                snake.direction='droite';
            }
            break;
    }
});



//fonction pour effacer un élément sur le plateau
function effacer(position){
    context.fillStyle = '#DDD5D0';
    context.fillRect(position[0]*longueurBlock, position[1]*largeurBlock, longueurBlock+5, largeurBlock+5);
}

//fonction pour obtenir un nombre aléatoire
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//classe correspondant au snake
class Snake {
    constructor() {
        this.direction = 'haut';
        this.corps = [[4,4],[4,5]];
        this.score=0;
    }
    //fonction pour dessiner le serpent
    dessinerSnake(){
        this.corps.forEach(element=>dessinerCorps(element));
    }
    deplacerCorps(){
        let head;
        head = [];
        switch(this.direction){
            case 'haut':
                head[1] = this.corps[0][1]-1;
                head[0] = this.corps[0][0]; 
                break;
            case 'bas':
                head[1] = this.corps[0][1]+1;
                head[0] = this.corps[0][0];
                break;
            case 'gauche':
                head[0] = this.corps[0][0]-1;
                head[1] = this.corps[0][1];
                break;
            case 'droite':
                head[0] = this.corps[0][0]+1;
                head[1] = this.corps[0][1];
                break;
        }

        this.corps.unshift(head);
        if(!this.fruitManger()){
            this.corps.pop();
        }
        else{
            this.score++;
            score.innerHTML="score : "+this.score*100;
            nbFruit.innerHTML=this.score;
        }
        this.dessinerSnake();
    }

    //fonction pour effacer le snake lors d'une nouvelle partie
    effacerCorps(){
        this.corps.forEach(element=>effacer(element));
    }
    fruitManger(){
        if(this.corps[0].join()===fruit.position.join()){
            return true;
        }
        return false;
    }
    gameOver(){   
        createGameOver(); 
        snake = null;
        clearTimeout(time);
    }
}

//classe représentant le fruit
class Fruit {
    
    constructor(){
        this.position = [];
    }
    
    dessinerFruit(){
        let abscisse = entierAleatoire(0,9);
        let ordonnee = entierAleatoire(0,9);
        while(snake.corps.join().includes([abscisse,ordonnee].join())){
            abscisse = entierAleatoire(0,9);
            ordonnee = entierAleatoire(0,9);
        } 
        context.drawImage(appleCanva,abscisse*longueurBlock, ordonnee*largeurBlock, longueurBlock, largeurBlock);
        this.position = [abscisse,ordonnee];
    }
};

function isCheck(liste){
   for(let i = 0;i<liste.length;i++){
        if(liste[i].checked){
            return liste[i].value;
        }
   }
}

function step(){
    if(snake.fruitManger() || fruit.position.join()===[].join()){
        effacer(fruit.position);
        fruit.dessinerFruit();
    }
    for(let i = 1; i<snake.corps.length;i++){
        if(snake.corps[0].join()===snake.corps[i].join())
            snake.gameOver();
    }
    if(snake.corps[0][0]==-1 || snake.corps[0][0]==monde.length || snake.corps[0][1]==-1 || snake.corps[0][1]==monde.length){
        snake.gameOver();
    }
    else{
        snake.effacerCorps();
        snake.deplacerCorps();
        time = setTimeout(step,isCheck(vitesse));
    }
}

function createCanvas(){
    let newC = document.createElement("canvas");
    newC.id="snakeGame";
    document.getElementsByTagName("body")[0].insertBefore(newC,menu);
}

function createGameOver(){
    var newGO = document.createElement("div");
    let newGOcontent = document.createElement("div")
    let newH1 = document.createElement("h1");
    let newBtn = document.createElement("button");

    newGO.id="gameOver";
    newGO.className="GAMEOVER";

    newGOcontent.className="GAMEOVER-content"

    newH1.textContent="GAME OVER";

    newBtn.id="menuBtn";
    newBtn.className="btn";
    newBtn.textContent="MENU"

    newGO.appendChild(newGOcontent);
    newGOcontent.appendChild(newH1);
    newGOcontent.appendChild(newBtn);
    
    newGO.querySelector(".btn").addEventListener("click",()=>{
        newGO.remove();
        deleteHeadFoot();
        deleteCanvas();
        menu.style.display="block";
        /* createMenu(cloneMenu); */

    });

    document.getElementsByTagName("body")[0].insertBefore(newGO,document.querySelector("script"));
}


function createHeadFoot(){
    let newHead = document.createElement("section");
    let newTitle = document.createElement("h1");
    let newFoot = document.createElement("section");
    let newScore = document.createElement("h2");
    let newFruit = document.createElement("div");
    let newImg = document.createElement("img");
    let newFruitManger = document.createElement("h2");

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

    document.getElementsByTagName("body")[0].insertBefore(newHead,menu);
    document.getElementsByTagName("body")[0].insertBefore(newFoot,document.querySelector("script"));

    return [newHead,newFoot];
}

/* function createMenu(clone){
    document.querySelector("body").insertBefore(clone,menu);
} */

function deleteHeadFoot(){
    document.querySelector(".header").remove();
    document.querySelector(".footer").remove();
}

function deleteCanvas(){
    document.querySelector("canvas").remove();
}