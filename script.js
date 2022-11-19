const plateau = document.getElementById("snakeGame");
const context = snakeGame.getContext("2d");

const canvaHeight = plateau.height;
const canvaWidth = plateau.width;
const tailleBlock = canvaHeight/5;

var monde =[
    [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]],
    [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],
    [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],
    [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
    [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5]],
    [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],
];

//liste correspondant au corps du snake
var snake = [
    [0,2]
]
var direction = 'haut';
var fruit;

function dessinerMonde(){
    context.fillStyle = 'green';
    monde.forEach(cellule=>{
        context.fillRect(cellule[0]*tailleBlock,cellule[1]*tailleBlock, tailleBlock, tailleBlock);
    });
}

//fonction permettant le dessin d'une partie du corps
function dessinerCorps(corps){
    context.fillStyle = 'blue';
    //context.strokestyle = 'darkblue';
    context.fillRect(corps[0]*tailleBlock, corps[1]*tailleBlock, tailleBlock, tailleBlock);
    //context.strokeRect(corps.x, corps.y, 5, 5);
}

function dessinerfruit(){
    context.fillStyle = 'red';
    //context.strokestyle = 'red';
    let abscisse = entierAleatoire(0,plateau.width-5);
    let ordonnee = entierAleatoire(0,plateau.height-5);

    context.fillRect(abscisse, ordonnee, 5, 5);
    //context.strokeRect(abscisse, ordonnee, 5, 5);
    return {x:abscisse,y:ordonnee}
}


//fonction pour dessiner le serpent
function dessinerSnake(){
    snake.forEach(element=>dessinerCorps(element));
}

document.addEventListener('keydown',(evt)=>{
    switch(evt.key){
        case 'ArrowUp':
            direction='haut';
            break;
        case 'ArrowDown':
            direction='bas';
            break;
        case 'ArrowLeft':
            direction='gauche';
            break;
        case 'ArrowRight':
            direction='droite';
            break;
    }
});

function deplacer(direction){
    switch(direction){
        case 'haut':
            
            effacer(snake[snake.length-1]);
            snake.forEach(element=>{
                element.y-=5;
            });
            dessinerCorps(snake[0]);
            break;
        case 'bas':
            
            effacer(snake[snake.length-1]);
            snake.forEach(element=>{
                element.y+=5;
            });
            dessinerCorps(snake[0]);
            break;
        case 'gauche':
            
            effacer(snake[snake.length-1]);
            snake.forEach(element=>{
                element.x-=5;
            });
            dessinerCorps(snake[0]);
            break;
        case 'droite':
        
            effacer(snake[snake.length-1]);
            snake.forEach(element=>{
                element.x+=5;
            });
            dessinerCorps(snake[0]);
            break;
    }
}

//fonction pour effacer un élément sur le plateau
function effacer(coordonnee){
    context.fillStyle = 'green';
    //context.strokestyle = 'green';
    context.fillRect(coordonnee.x, coordonnee.y, 5, 5);
    //context.strokeRect(coordonnee.x, coordonnee.y, 5, 5);
}

//fonction pour effacer le snake lors d'une nouvelle partie
function effacerSnake(){
    snake.forEach(element=>effacer(element));
    snake = [{x:100, y:100}]
}

//fonction pour obtenir un nombre aléatoire
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fruitManger(){
    if(snake[0].x+5 >= fruit.x && snake[0].y+5 >= fruit.y && snake[0].y+5 <= fruit.y+5 && snake[0].x+5 <= fruit.x+5){
        effacer(fruit);
        fruit = dessinerfruit();
    }
}

function step(){
    // if(fruit!=undefined||fruit!=null)
    //     effacer(fruit);
    dessinerSnake();
   
    deplacer(direction);
    fruitManger();

    setTimeout(step,10);
}

(()=>{ 
    fruit = dessinerfruit();
    step();
})();
