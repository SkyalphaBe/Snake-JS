import { Snake } from "./Snake.js";
import { Fruit } from "./Fruit.js";
import { HighScore } from "./HighScore.js";
import {createCanvas,createGameOver,createHeadFoot,deleteCanvas,deleteHeadFoot,sizeBoard,menu} from "./Element.js";

const appleCanva = document.getElementById("appleCanva");
const wallcheckBox = document.getElementById("murCheck");

var InstanceHighScore = (()=>{
    let instance;

    function createInstance(){
        let object = new HighScore();
        return object;
    }
    return{
        getInstance : ()=>{
            if(!instance)
                instance = createInstance()
            return instance;
        }
    }
})();


var oldScore = InstanceHighScore.getInstance();
oldScore.createStorage();

/**
 * Classe contenant toute les méthodes fonctionnelles du jeu
 */
class Game {
    constructor() {
        this.context = null;
        this.fruit = null;
        this.snake = null;
        this.world = [];
        this.sizeBlockY = null;
        this.sizeBlockX = null;
        this.score = 0;
        this.nbFruit = 0;
    }

    /**
     * Méthode pour rendre l'état d'origine à la carte (toutes les cases a 'EMPTY")
     * @param size attribut qui represente la tableau qui compose la carte
     */
    resetWorld(size) {
        this.world = [];
        for (let i = 0; i < size[0]; i++) {
            let subTab = [];
            for (let j = 0; j < size[1]; j++) {
                subTab.push('EMPTY');
            }
            this.world.push(subTab);
        }
    }

    /**
     * Méthode qui permet de dessiner les objets en fonction de leurs position
     */
    drawWorld() {
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world.length; j++) {
                if (this.world[i][j] == 'SNAKE') {
                    this.context.fillStyle = '#775EFF';
                    this.context.fillRect(i * this.sizeBlockX, j * this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                    if ([i, j].join() == this.snake.bodySnake[0].join()) {
                        this.drawEyes();
                    }

                } else if (this.world[i][j] == 'EMPTY') {
                    if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0)
                        this.context.fillStyle = '#DDD5D0';
                    else
                        this.context.fillStyle = '#B0AFAF';
                    this.context.fillRect(i * this.sizeBlockX, j * this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                } else if (this.world[i][j] == 'WALL' && wallcheckBox.checked) {
                    this.context.fillStyle = 'Brown';
                    this.context.fillRect(i * this.sizeBlockX, j * this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                } else if (this.world[i][j] == 'FRUIT') {
                    if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0)
                        this.context.fillStyle = '#DDD5D0';
                    else
                        this.context.fillStyle = '#B0AFAF';
                    this.context.fillRect(i * this.sizeBlockX, j * this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                    this.context.drawImage(appleCanva, i * this.sizeBlockX, j * this.sizeBlockY, this.sizeBlockX, this.sizeBlockY);
                }
            }
        }
    }

    /**
     * Méthode pour dessinner les yeux sur la tête du serpent
     */
    drawEyes() {
        this.context.fillStyle = 'black';
        if (this.snake.direction == 'haut' || this.snake.direction == 'bas') {
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0] * this.sizeBlockX + this.sizeBlockX / 4, this.snake.bodySnake[0][1]
                * this.sizeBlockY + this.sizeBlockY / 2, this.sizeBlockX / 8, 0, 2 * Math.PI);
            this.context.fill();
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0] * this.sizeBlockX + this.sizeBlockX / 4 * 3,
                this.snake.bodySnake[0][1] * this.sizeBlockY + this.sizeBlockY / 2, this.sizeBlockX / 8, 0, 2 * Math.PI);
            this.context.fill();

        } else if (this.snake.direction == 'gauche' || this.snake.direction == 'droite') {
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0] * this.sizeBlockX + this.sizeBlockX / 2, this.snake.bodySnake[0][1]
                * this.sizeBlockY + this.sizeBlockY / 4, this.sizeBlockX / 8, 0, 2 * Math.PI);
            this.context.fill();
            this.context.beginPath();
            this.context.arc(this.snake.bodySnake[0][0] * this.sizeBlockX + this.sizeBlockX / 2, this.snake.bodySnake[0][1]
                * this.sizeBlockY + this.sizeBlockY / 4 * 3, this.sizeBlockX / 8, 0, 2 * Math.PI);
            this.context.fill();
        }
    }

    /**
     * Méthode pour definir la postion des murs
     * @param tabPosition attribut qui represente toutes les positions dans la tableau 'wall' du fichier Json
     */
    drawWall(tabPosition) {
        for (let i = 0; i < tabPosition.length; i++) {
            this.world[tabPosition[i][0]][tabPosition[i][1]] = 'WALL';
        }
    }

    //fonction pour effacer le snake lors d'une nouvelle partie
    deleteSnake() {
        this.snake.bodySnake.forEach(element => this.deletePosition(element));
    }

    /**
     * Méthode pour definir la position du fruit si il est manger ainsi que de faire deplacer le serpent en fonctiond de la vitesse entrée en paramêtre
     * @param speed Attribut qui représente la vitesse a laquele le serpent vas ce dépalcer
     * @param wallList Attribut qui représente ma liste de l'essemble des murs
     * @param time
     */
    step(speed, wallList, time) {
        if (this.snake.eatFruit(this.fruit) || this.fruit.position.join() === [].join()) {
            this.deletePosition(this.fruit.position);
            this.fruit.placeFruit(this.world, this.snake, wallList);
        }
        if (!this.gameOver(wallList, time)) {
            this.deleteSnake();
            this.snake.moveBody(this.nbFruit, this.score, this.fruit, this.world);
            this.drawWorld(this.sizeBlockX, this.sizeBlockY);
            time = setTimeout(() => {
                this.step(speed, wallList, this.sizeBlockX, this.sizeBlockY, time);
            }, speed);
        }
    }

    /**
     * Méthode qui lance le fonctionnement du jeux
     * @param dimension Attribut qui représente la taille de la carte
     * @param positionSnake Attribut qui représente la position du seprent
     * @param wallList Attribut qui représente la liste des murs
     */
    start(dimension, positionSnake, wallList) {
        this.resetWorld(dimension);
        if (wallcheckBox.checked) {
            this.drawWall(wallList);
        }
        createHeadFoot();
        createCanvas();
        menu.style.display = "none";

        let plateau = document.getElementById("snakeGame");
        this.context = snakeGame.getContext("2d");

        this.sizeBlockX = plateau.height / this.world.length;
        this.sizeBlockY = plateau.width / this.world[1].length;

        this.score = document.getElementById("foot").children.item(0);
        this.nbFruit = document.getElementById("fruit").children.item(1);

        this.snake = new Snake(positionSnake);
        this.fruit = new Fruit(dimension);
    }

    //fonction pour effacer un élément sur le plateau
    deletePosition(position) {
        if (position.join() != [])
            this.world[position[0]][position[1]] = 'EMPTY';
    }

    stop(time) {
        createGameOver();
        this.snake = null;
        clearTimeout(time);
        return true;
    }

    /**
     * méthode qui permet de definir quand le joueur perds la partie
     * @param wallList Attribut qui représente la liste des position des mur;
     * @param time valeur su Timeout de la page
     * @returns {boolean}  renvoie false si pas de condition
     */
    gameOver(wallList,time){
        oldScore.compareNewScore(this.snake.score);
        for(let i = 1; i<this.snake.bodySnake.length;i++){
            if(this.snake.bodySnake[0].join()===this.snake.bodySnake[i].join()){
                return this.stop(time);
            }
        }
        if(this.snake.bodySnake[0][0]-1==-1&&this.snake.direction=='gauche'){
            return this.stop(time);
        }
        else if(this.snake.bodySnake[0][0]+1==this.world.length&&this.snake.direction=='droite'){
            return this.stop(time);
        }
        else if(this.snake.bodySnake[0][1]-1==-1&&this.snake.direction=='haut'){
            return this.stop(time);
        }
        else if(this.snake.bodySnake[0][1]+1==this.world.length&&this.snake.direction=='bas'){
            return this.stop(time);
        }
        if (wallcheckBox.checked){
            for(let i=0;i<wallList.length;i++){
                if(this.snake.bodySnake[0][0]+1== wallList[i][0]&&this.snake.bodySnake[0][1]== wallList[i][1]&&this.snake.direction=='droite'){
                    return this.stop(time);
                }
                else if(this.snake.bodySnake[0][0]-1== wallList[i][0]&&this.snake.bodySnake[0][1]== wallList[i][1]&&this.snake.direction=='gauche'){
                    return this.stop(time);
                }
                else if(this.snake.bodySnake[0][0]== wallList[i][0]&&this.snake.bodySnake[0][1]-1== wallList[i][1]&&this.snake.direction=='haut'){
                    return this.stop(time);
                }
                else if (this.snake.bodySnake[0][0]== wallList[i][0]&&this.snake.bodySnake[0][1]+1== wallList[i][1]&&this.snake.direction=='bas'){
                    return this.stop(time);
                }
            }
        }
        return false;
    }
}

export {Game,wallcheckBox,sizeBoard,oldScore};

