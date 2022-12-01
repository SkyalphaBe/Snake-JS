/**
 * Classe correspondant à un fruit
 * @author Valentin SEGALLA François GRAUX
 */
 class Fruit {
    /**
     * constructeur de la classe
     * @param dimension liste contenant les dimentions du tableau correspondant au monde
     */
    constructor(dimension){
        /**
         * position du fruit sur le plateau
         * @type {*[]}
         */
        this.position = [];
        /**
         * dimention du tableau
         */
        this.dimensionBoard = dimension;
    }

    /**
     * méthode permettant de positionner le fruit dans le tableau world
     * en faisant attention qu'il n'apparait pas sur le serpent ou un mur
     * @param world tableau correspondant au monde/plateau du jeu
     * @param snake Objet de la classe Snake
     * @param wallList liste contenant la position des murs
     */
    placeFruit(world,snake,wallList){
        let abscisse = randomInteger(0,this.dimensionBoard[0]-1);
        let ordonnee = randomInteger(0,this.dimensionBoard[1]-1);
        while(snake.bodySnake.join().includes([abscisse,ordonnee].join())
        ||wallList.join().includes([abscisse,ordonnee].join())) {
            abscisse = randomInteger(0, this.dimensionBoard[0] - 1);
            ordonnee = randomInteger(0, this.dimensionBoard[1] - 1);
        }
        world[abscisse][ordonnee]='FRUIT';
        this.position = [abscisse,ordonnee];
    }
}

//fonction pour obtenir un nombre aléatoire
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {Fruit};