/**
 * @author Valentin SEGALLA, François GRAUX
 */

class HighScore{
    /**
     * Méthode pour definir la valeur du meilleur score dans le localStorage a 0
     */
    createStorage(){
        localStorage.setItem("highScore",0);
    }

    /**
     * Méthode qui renvoie la valeur du meilleur score
     * @returns {number}
     */
    getHighScore(){
        return parseInt(localStorage.getItem("highScore"));
    }

    /**
     * Méthode qui compare le score stocker avec le nouveau en fin de partie pour mettre à jour ou non le meilleur score
     * @param score attribut correspondant au nouveau score du joueur à la fin de la partie
     */
    compareNewScore(score){
        if(this.getHighScore()<score){
            localStorage.clear();
            localStorage.setItem("highScore",score);

        }
    }
}
export{HighScore}