import {Game,wallcheckBox,sizeBoard} from './metier/game.js';

const btnStart = document.getElementById("startBtn");
const speed = document.querySelectorAll("input[type=radio]");

function choice(size){
    if (size == 1){
        return "./Json/smallCanvas.json";
    }
    else {
        return "./Json/bigCanvas.json";
    }
}

function isCheck(liste){
    for(let i = 0;i<liste.length;i++){
        if(liste[i].checked){
            return liste[i].value;
        }
    }
}

var InstanceGame = (()=>{
    let instance;

    function createInstance(){
        let object = new Game();
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
var game = InstanceGame.getInstance();

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
                game.start(data.dimensions,data.snakePosition,data.wall);
                let time;
                if(isCheck(speed) == 1){
                    game.step(data.lent,data.wall,time);
                }else if (isCheck(speed) == 2){
                    game.step(data.moyen,data.wall,time)
                }
                else if(isCheck(speed) == 3){
                    game.step(data.rapide,data.wall,time);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    importJSon(choice(sizeBoard.value));
});

document.addEventListener('keydown',(evt)=>{
    if(game.snake!=null){
        switch(evt.key){
            case 'ArrowUp':
                if(game.snake.direction!='bas'){
                    game.snake.direction='haut';
                }
                break;
            case 'ArrowDown':
                if(game.snake.direction!='haut'){
                    game.snake.direction='bas';
                }
                break;
            case 'ArrowLeft':
                if(game.snake.direction!='droite'){
                    game.snake.direction='gauche';
                }
                break;
            case 'ArrowRight':
                if(game.snake.direction!='gauche'){
                    game.snake.direction='droite';
                }
                break;
            case 'z':
                if(game.snake.direction!='bas'){
                    game.snake.direction='haut';
                }
                break;
            case 's':
                if(game.snake.direction!='haut'){
                    game.snake.direction='bas';
                }
                break;
            case 'q':
                if(game.snake.direction!='droite'){
                    game.snake.direction='gauche';
                }
                break;
            case 'd':
                if(game.snake.direction!='gauche'){
                    game.snake.direction='droite';
                }
                break;
        }
    }

});

wallcheckBox.addEventListener("click",()=>{
    if (wallcheckBox.checked){
        document.getElementsByClassName("btnWall")[0].querySelector("label").textContent="Avec mur";
    }
    else if (!wallcheckBox.checked){
        document.getElementsByClassName("btnWall")[0].querySelector("label").textContent="Sans mur";
    }
});