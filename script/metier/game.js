import { Snake } from "./Snake.js";
import { Fruit } from "./Fruit.js";
import {createCanvas,createGameOver,createHeadFoot,deleteCanvas,deleteHeadFoot,sizeBoard,menu} from "./Element.js";

const appleCanva = document.getElementById("appleCanva");
const wallcheckBox = document.getElementById("murCheck");

/**
 * Classe contenant toute les méthodes fonctionnelles du jeu
 */
class Game{
    constructor() {
        this.context =null;
        this.fruit =null;
        this.snake = null;
        this.world = [];
        this.sizeBlockY = null;
        this.sizeBlockX = null;
        this.score = 0;
        this.nbFruit = 0;
    }

    resetWorld(size){
        this.world=[];
        for(let i = 0 ;i<size[0];i++){
            let subTab = [];
            for(let j = 0;j<size[1];j++){
                subTab.push('EMPTY');
            }
            this.world.push(subTab);
        }
    }

    drawWorld(){
        for(let i = 0; i<this.world.length;i++){
            for(let j = 0; j<this.world.length;j++){
                if(this.world[i][j]=='SNAKE'){
                    this.context.fillStyle = '#775EFF';
                    this.context.fillRect(i*this.sizeBlockX,j*this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                    if([i,j].join()==this.snake.bodySnake[0].join()){
                        this.drawEyes();
                    }

                }
                else if(this.world[i][j]=='EMPTY'){
                    if(i%2==0&&j%2==0||i%2!=0&&j%2!=0)
                        this.context.fillStyle ='#DDD5D0';
                    else
                        this.context.fillStyle='#B0AFAF';
                    this.context.fillRect(i*this.sizeBlockX,j*this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                }
                else if(this.world[i][j]=='WALL' && wallcheckBox.checked){
                    this.context.fillStyle='Brown';
                    this.context.fillRect(i*this.sizeBlockX,j*this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                }
                else if (this.world[i][j]=='FRUIT')
                    this.context.drawImage(appleCanva,i*this.sizeBlockX, j*this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
            }
        }
    }

    drawEyes(){
        this.context.fillStyle='black';
        if(this.snake.direction=='haut'||this.snake.direction=='bas'){
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0]*this.sizeBlockX+this.sizeBlockX/4,this.snake.bodySnake[0][1]
                *this.sizeBlockY+this.sizeBlockY/2,this.sizeBlockX/8,0,2*Math.PI);
            this.context.fill();
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0]*this.sizeBlockX+this.sizeBlockX/4*3,
                this.snake.bodySnake[0][1]*this.sizeBlockY+this.sizeBlockY/2,this.sizeBlockX/8,0,2*Math.PI);
            this.context.fill();

        }
        else if(this.snake.direction=='gauche'||this.snake.direction=='droite'){
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0]*this.sizeBlockX+this.sizeBlockX/2,this.snake.bodySnake[0][1]
                *this.sizeBlockY +this.sizeBlockY/4,this.sizeBlockX/8,0,2*Math.PI);
            this.context.fill();
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0]*this.sizeBlockX+this.sizeBlockX/2,this.snake.bodySnake[0][1]
                *this.sizeBlockY +this.sizeBlockY/4*3,this.sizeBlockX/8,0,2*Math.PI);
            this.context.fill();
        }
    }

    drawWall(tabPosition){
        for (let i = 0;i<tabPosition.length;i++){
            this.world[tabPosition[i][0]][tabPosition[i][1]]='WALL';
        }
    }

    //fonction pour effacer le snake lors d'une nouvelle partie
    deleteSnake(){
        this.snake.bodySnake.forEach(element=>this.deletePosition(element));
    }

    step(speed,wallList,time){
        if(this.snake.eatFruit(this.fruit) || this.fruit.position.join()===[].join()){
            this.deletePosition(this.fruit.position);
            this.fruit.placeFruit(this.world,this.snake,wallList);
        }
        if(!this.gameOver(wallList,time)){
            this.deleteSnake();
            this.snake.moveBody(this.nbFruit,this.score,this.fruit,this.world);
            this.drawWorld(this.sizeBlockX,this.sizeBlockY);
            time = setTimeout(()=>{
                this.step(speed,wallList,this.sizeBlockX,this.sizeBlockY,time);
            },speed);
        }
    }

    start(dimension,positionSnake,wallList){
        this.resetWorld(dimension);
        if (wallcheckBox.checked){
            this.drawWall(wallList);
        }
        createHeadFoot();
        createCanvas();
        menu.style.display="none";

        let plateau = document.getElementById("snakeGame");
        this.context = snakeGame.getContext("2d");

        this.sizeBlockX = plateau.height/this.world.length;
        this.sizeBlockY = plateau.width/this.world[1].length;

        this.score = document.getElementById("foot").children.item(0);
        this.nbFruit = document.getElementById("fruit").children.item(1);

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

        this.snake = InstanceSnake.getInstance();
        this.fruit = InstanceFruit.getInstance();
    }

    //fonction pour effacer un élément sur le plateau
    deletePosition(position){
        if(position.join()!=[])
            this.world[position[0]][position[1]]='EMPTY';
    }

    gameOver(wallList,time){
        for(let i = 1; i<this.snake.bodySnake.length;i++){
            if(this.snake.bodySnake[0].join()===this.snake.bodySnake[i].join()){
                createGameOver();
                this.snake = null;
                clearTimeout(time);
                return true;
            }
        }
        if(this.snake.bodySnake[0][0]-1==-1&&this.snake.direction=='gauche'){
            createGameOver();
            this.snake = null;
            clearTimeout(time);
            return true;
        }
        else if(this.snake.bodySnake[0][0]+1==this.world.length&&this.snake.direction=='droite'){
            createGameOver();
            this.snake = null;
            clearTimeout(time);
            return true;
        }
        else if(this.snake.bodySnake[0][1]-1==-1&&this.snake.direction=='haut'){
            createGameOver();
            this.snake = null;
            clearTimeout(time);
            return true;
        }
        else if(this.snake.bodySnake[0][1]+1==this.world.length&&this.snake.direction=='bas'){
            createGameOver();
            this.snake = null;
            clearTimeout(time);
            return true;
        }
        if (wallcheckBox.checked){
            for(let i=0;i<wallList.length;i++){
                if(this.snake.bodySnake[0][0]+1== wallList[i][0]&&this.snake.bodySnake[0][1]== wallList[i][1]&&this.snake.direction=='droite'){
                    createGameOver();
                    this.snake = null;
                    clearTimeout(time);
                    return true;
                }
                else if(this.snake.bodySnake[0][0]-1== wallList[i][0]&&this.snake.bodySnake[0][1]== wallList[i][1]&&this.snake.direction=='gauche'){
                    createGameOver();
                    this.snake = null;
                    clearTimeout(time);
                    return true;
                }
                else if(this.snake.bodySnake[0][0]== wallList[i][0]&&this.snake.bodySnake[0][1]-1== wallList[i][1]&&this.snake.direction=='haut'){
                    createGameOver();
                    this.snake = null;
                    clearTimeout(time);
                    return true;
                }
                else if (this.snake.bodySnake[0][0]== wallList[i][0]&&this.snake.bodySnake[0][1]+1== wallList[i][1]&&this.snake.direction=='bas'){
                    createGameOver();
                    this.snake = null;
                    clearTimeout(time);
                    return true;
                }
            }
        }
        return false;
    }
}



export {Game,wallcheckBox,sizeBoard};

