const plateau = document.getElementById("snakeGame");
const context = snakeGame.getContext("2d");

//liste correspondant au corps du snake
var snake = [ 
    {x:100, y:100} 
]
var direction = 'haut';
var fruit;

//fonction permettant le dessin d'une partie du corps
function dessinerCorps(corps){
    context.fillStyle = 'blue';
    //context.strokestyle = 'darkblue';
    context.fillRect(corps.x, corps.y, 5, 5);
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
    deplacer(direction);
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

function jeu(){
    
    
    
}
 console.log(plateau.style.background);

(()=>{
    effacer(fruit);
    effacerSnake();
    dessinerSnake();
    fruit = dessinerfruit();
    jeu();
})();
