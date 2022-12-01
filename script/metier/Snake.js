const audio = document.getElementById("eatFruit");

/**
 * Classe correspondant au serpent
 * @author Valentin SEGALLA François GRAUX
 */
 class Snake {
    /**
     * Constructeur de la classe
     * @param position position initial du snake contenu dans un tableau
     */
    constructor(position) {
        /**
         * direction/ orientation du snake
         * @type {string}
         */
        this.direction = 'haut';
        /**
         * tableau contenant la position du corps du snake dans le jeu
         */
        this.bodySnake = position;
        /**
         * score correspodant au nombre de fruit mangé
         * @type {number}
         */
        this.score=0;
    }

    /**
     * méthode pour positionner le serpent dans le tableau world
     * @param position position d'une partie du corps
     * @param world tableau correspondant au monde/plateau du jeu
     */
    positionBody(position,world){
        world[position[0]][position[1]]='SNAKE';
    }

    /**
     * méthode permettant de positionnner tout le serpent dans le monde
     * @param world tableau correspondant au monde/plateau du jeu
     */
    positionSnake(world){
        this.bodySnake.forEach(element=>this.positionBody(element,world));
    }

    /**
     * méthode permettant de déplacer le corps sur le plateau
     * @param nbFruit élément HTML pour afficher le nombre de fruit mangé
     * @param score élément HTML pour afficher le score de la partie actuelle
     * @param fruit Objet de la classe Fruit
     * @param world tableau correspondant au monde/plateau du jeu
     */
    moveBody(nbFruit,score,fruit,world) {
        let head;
        head = [];
        switch (this.direction) {
            case 'haut':
                head[1] = this.bodySnake[0][1] - 1;
                head[0] = this.bodySnake[0][0];
                break;
            case 'bas':
                head[1] = this.bodySnake[0][1] + 1;
                head[0] = this.bodySnake[0][0];
                break;
            case 'gauche':
                head[0] = this.bodySnake[0][0] - 1;
                head[1] = this.bodySnake[0][1];
                break;
            case 'droite':
                head[0] = this.bodySnake[0][0] + 1;
                head[1] = this.bodySnake[0][1];
                break;
        }

        this.bodySnake.unshift(head);
        if (!this.eatFruit(fruit)) {
            this.bodySnake.pop();
        } else {
            this.score++;
            score.innerHTML = "score : " + this.score * 100;
            audio.play();
            nbFruit.innerHTML = this.score;
        }
        this.positionSnake(world);
    }

    /**
     * méthode vérifiant si un fruit est mangé
     * @param fruit Objet de la classe Fruit
     * @returns {boolean} True si le fruit est mangé, sinon False
     */
    eatFruit(fruit){
        if(this.bodySnake[0].join()===fruit.position.join()){
            return true;
        }
        return false;
    }
}

export {Snake};