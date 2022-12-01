class HighScore{

    createStorage(){
        localStorage.setItem("highScore",0);
    }

    getHighScore(){
        return parseInt(localStorage.getItem("highScore"));
    }

    compareNewScore(score){
        if(this.getHighScore()<score){
            localStorage.clear();
            localStorage.setItem("highScore",score);

        }
    }
}
export{HighScore}