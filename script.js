const plateau = document.getElementById("snakeGame");
const context = snakeGame.getContext("2d");

var monde =[
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

const canvaHeight = plateau.height;
const canvaWidth = plateau.width;
const longueurBlock = canvaWidth/monde.length;
const largeurBlock = canvaHeight/monde.length;


function dessinerMonde(){
    context.fillStyle = 'green';
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
            snake.direction='haut';
            break;
        case 'ArrowDown':
            snake.direction='bas';
            break;
        case 'ArrowLeft':
            snake.direction='gauche';
            break;
        case 'ArrowRight':
            snake.direction='droite';
            break;
    }
});

//fonction pour effacer un élément sur le plateau
function effacer(position){
    context.fillStyle = 'green';
    context.fillRect(position[0]*longueurBlock, position[1]*largeurBlock, longueurBlock, largeurBlock);
}

//fonction pour obtenir un nombre aléatoire
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//classe correspondant au snake
class Snake {
    constructor() {
        this.tete = [1,5];
        this.direction = 'droite';
        this.corps = [{position : [0,5],direction : "droite"}];
        //chaque partie de corps : {position : [],direction : ""}
    }
    //fonction pour dessiner le serpent
    dessinerSnake(){
        dessinerCorps(this.tete);
        this.corps.forEach(element=>dessinerCorps(element.position));
    }
    deplacerTete(){
        this.effacerTete();
        this.LastPosition = snake.tete;
        this.lastDirection = this.direction;
        switch(this.direction){
            case 'haut':
                this.tete[1]-=1;
                break;
            case 'bas':
                this.tete[1]+=1;
                break;
            case 'gauche':
                this.tete[0]-=1;
                break;
            case 'droite':
                this.tete[0]+=1;
                break;
        }
        this.dessinerSnake();
    }

    grandicement(){
        if(this.fruitManger()){
            this.corps.push({position:[this.LastPosition[0],this.LastPosition[1]],direction:this.lastDirection});
        }
    }

    deplacerCorps(){
        this.corps.forEach(element =>{
            if(element.position.join()===this.LastPosition.join()){
                element.direction=this.direction;
                this.effacerCorps();
            }
            console.log(element.direction);
            switch(element.direction){
                case 'haut':
                    element.position[1]-=1;
                    break;
                case 'bas':
                    element.position[1]+=1;
                    break;
                case 'gauche':
                    element.position[0]-=1;
                    break;
                case 'droite':
                    element.position[0]+=1;
                    break;
            }
        });
    }
    //fonction pour effacer le snake lors d'une nouvelle partie
   effacerTete(){
        effacer(this.tete);
    }
    effacerCorps(){
        this.corps.forEach(element=>effacer(element.position));
    }
    fruitManger(){
        if(this.tete.join()===fruit.position.join())
            return true;
        return false;
    }
}

//classe représentant le fruit
class Fruit {
    
    constructor(){
        this.position = [];
    }
    
    dessinerFruit(){
        context.fillStyle = 'red';
        let abscisse = entierAleatoire(0,9);
        let ordonnee = entierAleatoire(0,9);
        context.fillRect(abscisse*longueurBlock, ordonnee*largeurBlock, longueurBlock, largeurBlock);
        this.position = [abscisse,ordonnee];
    }
};

function step(){
    if(snake.fruitManger() || fruit.position.join()===[].join()){
        effacer(fruit.position);
        fruit.dessinerFruit();
    }
    
    snake.deplacerTete();
    // snake.deplacerCorps();
    snake.grandicement();
    setTimeout(step,500);
}

var fruit;
var snake;

(()=>{ 
    snake = new Snake();
    fruit = new Fruit();
    dessinerMonde();
    step();
})();
