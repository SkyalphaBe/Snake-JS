const btnStart = document.getElementById("startBtn");
const menu = document.getElementById("myModal");
const speed = document.querySelectorAll("input[type=radio]");
const sizeBoard = document.querySelector("input[type=range]");
const head = document.getElementById("head");
const appleCanva = document.getElementById("appleCanva");
const audio = document.getElementById("eatFruit");

var context;
var sizeBlockX;
var sizeBlockY;
var score;
var nbFruit;
var apple;
var fruit;
var snake;
var time;
var world = [];

//classe correspondant au snake
class Snake {
    constructor(position) {
        this.direction = 'haut';
        this.bodySnake = position;
        this.score=0;
    }
    //fonction pour dessiner le serpent
    positionBody(position){
        world[position[0]][position[1]]='SNAKE';
    }
    positionSnake(){
        this.bodySnake.forEach(element=>this.positionBody(element));
    }
    moveBody(){
        let head;
        head = [];
        switch(this.direction){
            case 'haut':
                head[1] = this.bodySnake[0][1]-1;
                head[0] = this.bodySnake[0][0];
                break;
            case 'bas':
                head[1] = this.bodySnake[0][1]+1;
                head[0] = this.bodySnake[0][0];
                break;
            case 'gauche':
                head[0] = this.bodySnake[0][0]-1;
                head[1] = this.bodySnake[0][1];
                break;
            case 'droite':
                head[0] = this.bodySnake[0][0]+1;
                head[1] = this.bodySnake[0][1];
                break;
        }

        this.bodySnake.unshift(head);
        if(!this.eatFruit()){
            this.bodySnake.pop();
        }
        else{
            this.score++;
            score.innerHTML="score : "+this.score*100;
            audio.play();
            nbFruit.innerHTML=this.score;
        }
        this.positionSnake();
    }
    //fonction pour effacer le snake lors d'une nouvelle partie
    deleteBody(){
        this.bodySnake.forEach(element=>deletePosition(element));
    }
    eatFruit(){
        if(this.bodySnake[0].join()===fruit.position.join()){
            return true;
        }
        return false;
    }
}

//classe représentant le fruit
class Fruit {

    constructor(dimension){
        this.position = [];
        this.dimensionBoard = dimension;
    }

    drawFruit(){
        let abscisse = randomInteger(0,this.dimensionBoard[0]-1);
        let ordonnee = randomInteger(0,this.dimensionBoard[1]-1);
        while(snake.bodySnake.join().includes([abscisse,ordonnee].join())){
            abscisse = randomInteger(0,this.dimensionBoard[0]-1);
            ordonnee = randomInteger(0,this.dimensionBoard[1]-1);
        }
        if(abscisse%2==0&&ordonnee%2==0||abscisse%2!=0&&ordonnee%2!=0)
            context.fillStyle ='#DDD5D0';
        else
            context.fillStyle='#B0AFAF';
        context.fillRect(abscisse*sizeBlockX, ordonnee*sizeBlockY, sizeBlockX, sizeBlockY);
        context.drawImage(appleCanva,abscisse*sizeBlockX, ordonnee*sizeBlockY, sizeBlockX, sizeBlockY);
        world[abscisse][ordonnee]='FRUIT';
        this.position = [abscisse,ordonnee];
    }
}

function choice(size){
    if (size == 1){
        return "./Json/smallCanvas.json";
    }
    else {
        return "./Json/bigCanvas.json";
    }
}

function drawWorld(){
    for(let i = 0; i<world.length;i++){
        for(let j = 0; j<world.length;j++){
            if(world[i][j]=='SNAKE'){
                context.fillStyle = '#775EFF';
                context.fillRect(i*sizeBlockX,j*sizeBlockY, sizeBlockX, sizeBlockY);
                if([i,j].join()==snake.bodySnake[0].join()){
                    context.fillStyle='black';
                    if(snake.direction=='haut'||snake.direction=='bas'){
                        context.beginPath();
                        context.arc(snake.bodySnake[0][0]*sizeBlockX+sizeBlockX/4,snake.bodySnake[0][1]*sizeBlockY+sizeBlockY/2,sizeBlockX/8,0,2*Math.PI);
                        context.fill();
                        context.beginPath();
                        context.arc(snake.bodySnake[0][0]*sizeBlockX+sizeBlockX/4*3,snake.bodySnake[0][1]*sizeBlockY+sizeBlockY/2,sizeBlockX/8,0,2*Math.PI);
                        context.fill();
                        
                    }
                    else if(snake.direction=='gauche'||snake.direction=='droite'){
                        context.beginPath();
                        context.arc(snake.bodySnake[0][0]*sizeBlockX+sizeBlockX/2,snake.bodySnake[0][1]*sizeBlockY+sizeBlockY/4,sizeBlockX/8,0,2*Math.PI);
                        context.fill();
                        context.beginPath();
                        context.arc(snake.bodySnake[0][0]*sizeBlockX+sizeBlockX/2,snake.bodySnake[0][1]*sizeBlockY+sizeBlockY/4*3,sizeBlockX/8,0,2*Math.PI);
                        context.fill();
                    }
                }
                
            }
            else if(world[i][j]=='EMPTY'){
                if(i%2==0&&j%2==0||i%2!=0&&j%2!=0)
                    context.fillStyle ='#DDD5D0';
                else
                    context.fillStyle='#B0AFAF';
                context.fillRect(i*sizeBlockX,j*sizeBlockY, sizeBlockX, sizeBlockY);
            }
            else if(world[i][j]=='WALL'){
                context.fillStyle='Brown';
                context.fillRect(i*sizeBlockX,j*sizeBlockY, sizeBlockX, sizeBlockY);
            }
        }
    }
}




function drawWall(tabPosition){
    for (let i = 0;i<tabPosition.length;i++){
        world[tabPosition[i][0]][tabPosition[i][1]]='WALL';
    }
}
function resetWorld(size){
    world=[];
    for(let i = 0 ;i<size[0];i++){
        let subTab = [];
        for(let j = 0;j<size[1];j++){
            subTab.push('EMPTY');
        }
        world.push(subTab);
    }
}

function step(speed,wallList){
    if(snake.eatFruit() || fruit.position.join()===[].join()){
        deletePosition(fruit.position);
        fruit.drawFruit();
    }
    if(!gameOver(wallList)){
        snake.deleteBody();
        snake.moveBody();
        drawWorld();
        time = setTimeout(()=>{
            step(speed,wallList);
        },speed);
    }
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

function startGame(dimension,positionSnake,wallList){
    resetWorld(dimension);
    drawWall(wallList);
    createHeadFoot();
    createCanvas();
    menu.style.display="none";

    var plateau = document.getElementById("snakeGame");
    context = snakeGame.getContext("2d");
    var canvaHeight = plateau.height;
    var canvaWidth = plateau.width;

    sizeBlockX = canvaWidth/world.length;
    sizeBlockY = canvaHeight/world[1].length;

    score = document.getElementById("foot").children.item(0);
    nbFruit = document.getElementById("fruit").children.item(1);
    apple = document.getElementById('apple');

    var InstanceFruit = ((dimension)=>{
        let instance;
    
        function createInstance(dimension){
            let object = new Fruit(dimension);
            return object;
        }
        return{
            getInstance : ()=>{
                if(!instance)
                    instance = createInstance(dimension)
                return instance; 
            }
        }
    })(dimension);

    var InstanceSnake = ((position)=>{
        let instance;
    
        function createInstance(position){
            let object = new Snake(position);
            return object;
        }
        return{
            getInstance : ()=>{
                if(!instance)
                    instance = createInstance(position)
                return instance; 
            }
        }
    })(positionSnake);

    snake = InstanceSnake.getInstance();
    fruit = InstanceFruit.getInstance();
}

//fonction pour effacer un élément sur le plateau
function deletePosition(position){
    if(position.join()!=[])
        world[position[0]][position[1]]='EMPTY';
}

//fonction pour obtenir un nombre aléatoire
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function gameOver(wallList){
    for(let i = 1; i<snake.bodySnake.length;i++){
        if(snake.bodySnake[0].join()===snake.bodySnake[i].join()){
            createGameOver();
            snake = null;
            clearTimeout(time);
            return true;
        }
    }
    if(snake.bodySnake[0][0]-1==-1&&snake.direction=='gauche'){
        createGameOver();
        snake = null;
        clearTimeout(time);
        return true;
    }
    else if(snake.bodySnake[0][0]+1==world.length&&snake.direction=='droite'){
        createGameOver();
        snake = null;
        clearTimeout(time);
        return true;
    }
    else if(snake.bodySnake[0][1]-1==-1&&snake.direction=='haut'){
        createGameOver();
        snake = null;
        clearTimeout(time);
        return true;
    }
    else if(snake.bodySnake[0][1]+1==world.length&&snake.direction=='bas'){
        createGameOver();
        snake = null;
        clearTimeout(time);
        return true;
    }
    for(let i=0;i<wallList.length;i++){
        if(snake.bodySnake[0][0]+1== wallList[i][0]&&snake.bodySnake[0][1]== wallList[i][1]&&snake.direction=='droite'){// || snake.bodySnake[0][0]+1==world.length&&snake.direction=='droite' || snake.bodySnake[0][1]-1==-1&&snake.direction=='haut' || snake.bodySnake[0][1]+1==world.length&&snake.direction=='bas'){
            createGameOver();
            snake = null;
            clearTimeout(time);
            return true;
        }
        else if(snake.bodySnake[0][0]-1== wallList[i][0]&&snake.bodySnake[0][1]== wallList[i][1]&&snake.direction=='gauche'){
            createGameOver();
            snake = null;
            clearTimeout(time);
            return true;
        }
        else if(snake.bodySnake[0][0]== wallList[i][0]&&snake.bodySnake[0][1]-1== wallList[i][1]&&snake.direction=='haut'){
            createGameOver();
            snake = null;
            clearTimeout(time);
            return true;
        }
        else if (snake.bodySnake[0][0]== wallList[i][0]&&snake.bodySnake[0][1]+1== wallList[i][1]&&snake.direction=='bas'){
            createGameOver();
            snake = null;
            clearTimeout(time);
            return true;
        }
    }
    return false;
}

function isCheck(liste){
    for(let i = 0;i<liste.length;i++){
        if(liste[i].checked){
            return liste[i].value;
        }
    }
}

btnStart.addEventListener("click",()=>{
    function importJSon(url){
        fetch(url)
            .then(function(response) {
                if (response.ok) {
                    return response.json(); // une promesse
                } else {
                    throw ("Error " + response.status);
                }
            })
            .then (function(data) {
                startGame(data.dimensions,data.snakePosition,data.wall);
                if(isCheck(speed) == 1){
                    step(data.lent,data.wall);
                }else if (isCheck(speed) == 2){
                    step(data.moyen,data.wall)
                }
                else if(isCheck(speed) == 3){
                    step(data.rapide,data.wall);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    importJSon(choice(sizeBoard.value));
});

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
        case 'z':
            if(snake.direction!='bas'){
                snake.direction='haut';
            }
            break;
        case 's':
            if(snake.direction!='haut'){
                snake.direction='bas';
            }
            break;
        case 'q':
            if(snake.direction!='droite'){
                snake.direction='gauche';
            }
            break;
        case 'd':
            if(snake.direction!='gauche'){
                snake.direction='droite';
            }
            break;
    }
});