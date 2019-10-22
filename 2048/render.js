import Game from "./engine/game.js";

var createdListeners = false;

export const updateBoard = function(game){
    for(var i = 0; i < game.board.length; i++){
        document.getElementById(i.toString(10)).innerHTML = game.board[i];
        if(game.board[i] == 0){
            $(`#${i.toString(10)}`).css("visibility", "hidden"); 
        }else{
            $(`#${i.toString(10)}`).css("visibility", "visible"); 

        }
        colorTiles(game, i);
    }
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(game.over == true){
        document.getElementById("end").innerHTML = "You Lost! Your score was " + game.score + ". Press \"Reset\" to try again!";
    }
    if(game.won == true){
        document.getElementById("end").innerHTML = "You Won! Keep going!";

    }
}

export const loadNewGame = function(game){

    for(var i = 0; i < game.board.length; i++){
        document.getElementById(i.toString(10)).innerHTML = game.board[i];
        if(game.board[i] == 0){
            $(`#${i.toString(10)}`).css("visibility", "hidden"); 
        }else{
            $(`#${i.toString(10)}`).css("visibility", "visible"); 

        }
        colorTiles(game, i);

    }
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(createdListeners == false){
        $(document).keydown(function(e){
            var s = String.fromCharCode(e.which);
            keyPressed(s, game);
            updateBoard(game);
        });
        $('#reset').on("click", function(){
            game.setupNewGame();
            document.getElementById("end").innerHTML = "";
            loadNewGame(game);
    
        });
        createdListeners = true;
    }
};

export const colorTiles = function(game, i){
    switch(game.board[i]){
        case 2:
            $(`#${i.toString(10)}`).css("background", "#FE8C9E");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 4:
            $(`#${i.toString(10)}`).css("background", "#E68198");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 8:
            $(`#${i.toString(10)}`).css("background", "#CD7691");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 16:
            $(`#${i.toString(10)}`).css("background", "#B46C89");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 32:
            $(`#${i.toString(10)}`).css("background", "#9C627F");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 64:
            $(`#${i.toString(10)}`).css("background", "#845874");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 128:
            $(`#${i.toString(10)}`).css("background", "#6E4E68");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.5vw");

            break;
        case 256:
            $(`#${i.toString(10)}`).css("background", "#59435B");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.5vw");
            break;
        case 512:
            $(`#${i.toString(10)}`).css("background", "#45394D");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.5vw");
            break;
        case 1024:
            $(`#${i.toString(10)}`).css("background", "#342E3F");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.25vw");
            break;
        case 2048:
            $(`#${i.toString(10)}`).css("background", "#242431");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.25vw");
            break;
        default:
            $(`#${i.toString(10)}`).css("background", "#242431");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "1.1vw");

    }
}

export const keyPressed = function(key, game){
    switch (key) {
        case '\'':
            game.move('right');
            break;
        case '%':
            game.move('left');
            break;
        case '(':
            game.move('down');
            break;
        case '&':
            game.move('up');
            break;
    }

}


$(document).ready(function () {
    let game = new Game(4);
    loadNewGame(game);
});
