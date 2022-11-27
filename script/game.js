const btnStart = document.getElementById("startBtn");
const ModalGameOver = document.getElementsByClassName("GAMEOVER")[0];
const menu = document.getElementById("myModal");
const vitesse = document.querySelectorAll("input[type=radio]");
const taillePlateau = document.querySelector("input[type=range]").value;
const head = document.getElementById("head");
const appleCanva = document.getElementById("appleCanva");
const goBack = document.getElementById("menuBtn");

var context;
var longueurBlock;
var largeurBlock;
var score;
var nbFruit;
var apple;

btnStart.addEventListener("click",startGame);

function startGame(){
    réinitialiserMonde();
    createHeadFoot();
    createCanvas();
    menu.style.display="none";

    var plateau = document.getElementById("snakeGame");
    context = snakeGame.getContext("2d");
    var canvaHeight = plateau.height;
    var canvaWidth = plateau.width;
    

    longueurBlock = canvaWidth/monde.length;
    largeurBlock = canvaHeight/monde.length;

    score = document.getElementById("foot").children.item(0);
    nbFruit = document.getElementById("fruit").children.item(1);
    apple = document.getElementById('apple');

    snake = new Snake([[4,4],[4,5]]);
    fruit = new Fruit();
    if(isCheck(vitesse) != null){
        step();
    }
}

var fruit;
var snake;
var time;

var monde = [];

function réinitialiserMonde(){
    monde = [
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
        ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'],
    ];
}


function dessinerMonde(){
    for(let i = 0; i<monde.length;i++){
        for(let j = 0; j<monde.length;j++){
            if(monde[i][j]=='SNAKE')
                context.fillStyle = 'blue';   
            else if(monde[i][j]=='EMPTY')
                context.fillStyle ='#DDD5D0';
            if (monde[i][j]!='FRUIT')
                context.fillRect(i*longueurBlock,j*largeurBlock, longueurBlock, largeurBlock);
        }
    }
}

function positionnerCorps(position){
    monde[position[0]][position[1]]='SNAKE';
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
    if(position.join()!=[])
        monde[position[0]][position[1]]='EMPTY';
}

//fonction pour obtenir un nombre aléatoire
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//classe correspondant au snake
class Snake {
    constructor(position) {
        this.direction = 'haut';
        this.corps = position;
        this.score=0;
    }
    //fonction pour dessiner le serpent
    positionnerSnake(){
        this.corps.forEach(element=>positionnerCorps(element));
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
        console.log(this.corps);
        this.positionnerSnake();
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
}

//classe représentant le fruit
class Fruit {
    
    constructor(){
        this.position = [];
    }
    
    dessinerFruit(){
        context.fillStyle ='#DDD5D0';
        let abscisse = entierAleatoire(0,9);
        let ordonnee = entierAleatoire(0,9);
        while(snake.corps.join().includes([abscisse,ordonnee].join())){
            abscisse = entierAleatoire(0,9);
            ordonnee = entierAleatoire(0,9);
        } 
        context.fillRect(abscisse*longueurBlock, ordonnee*largeurBlock, longueurBlock, largeurBlock);
        context.drawImage(appleCanva,abscisse*longueurBlock, ordonnee*largeurBlock, longueurBlock, largeurBlock);
        monde[abscisse][ordonnee]='FRUIT';
        this.position = [abscisse,ordonnee];
    }
}

function isCheck(liste){
   for(let i = 0;i<liste.length;i++){
        if(liste[i].checked){
            return liste[i].value;
        }
   }
}

function gameOver(){
    for(let i = 1; i<snake.corps.length;i++){
        if(snake.corps[0].join()===snake.corps[i].join()){ 
            createGameOver(); 
            snake = null;
            clearTimeout(time);
            return true;
        }
    }
    if(snake.corps[0][0]-1==-1 || snake.corps[0][0]+1==monde.length || snake.corps[0][1]-1==-1 || snake.corps[0][1]+1==monde.length){
        createGameOver(); 
        snake = null;
        clearTimeout(time);
        return true;
    }
    return false;
}

function step(){
    if(snake.fruitManger() || fruit.position.join()===[].join()){
        effacer(fruit.position);
        fruit.dessinerFruit();
    }
    if(!gameOver()){
        snake.effacerCorps();
        snake.deplacerCorps();
        dessinerMonde();
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

function deleteHeadFoot(){
    document.querySelector(".header").remove();
    document.querySelector(".footer").remove();
}

function deleteCanvas(){
    document.querySelector("canvas").remove();
}