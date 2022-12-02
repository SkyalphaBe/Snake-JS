const canvasMenu =document.getElementById("canvasAccueil");
const ctx = canvasAccueil.getContext("2d");

canvasMenu.height=document.body.clientHeight;
canvasMenu.width=document.body.clientWidth;

window.addEventListener("resize",()=>{
    canvasMenu.height=document.body.clientHeight;
    canvasMenu.width=document.body.clientWidth;
});

/**
 *
 * @param min valeur minimale du nombre
 * @param max valeur maximale ud nombre
 * @returns {*}
 */
function randomInteger(min, max) {
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    while(res===0){
        res = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return res;
}

/**
 * class qui représente les pomme qui ce deplace dans le menu
 */
class AppleMenu{
    constructor() {
        this.x = randomInteger(100,1800);
        this.y = randomInteger(100,900);
        this.dx = randomInteger(2,-2);
        this.dy = randomInteger(2,-2);
        this.img = document.getElementById("appleCanva");
    }

    /**
     * Méthode pour dessiner une pomme
     */
    drawMenuFruit(){
        ctx.beginPath();
        ctx.drawImage(this.img,this.x,this.y,100,100);
        ctx.fill();
        ctx.closePath();
    }

    /**
     * méthode pour deplacer les fruits dans le canvas
     */
    draw(){
        this.drawMenuFruit();

        if(this.x<0){
            this.dx=-this.dx;
        }
        if(this.y<0){
            this.dy=-this.dy;
        }
        if(this.x+100>canvasMenu.width){
            this.dx=-this.dx;
        }
        if (this.y+100>canvasMenu.height){
            this.dy=-this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    /**
     *Méthode qui créer un tableau qet qui le remplis avec des objets AppleMenu
     */
    static createTabApple(){
        AppleMenu.tab = [];
        for (let i = 0;i<30;i++){
            AppleMenu.tab[i] = new AppleMenu();
        }
    }

    /**
     * dessine tout les fruits du tableau static
     */
    static drawAllFruit(){
        ctx.clearRect(0, 0, canvasMenu.width, canvasMenu.height);
        for (let i = 0;i<AppleMenu.tab.length;i++){
            AppleMenu.tab[i].draw();
        }
    }
}

AppleMenu.createTabApple();
setInterval(AppleMenu.drawAllFruit,10);
