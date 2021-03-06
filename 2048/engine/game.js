//import { get } from "http";

export default class Game {
    constructor(boardSize) {
        this.size = boardSize;
        this.onMoveListeners = [];
        this.onWinListeners = [];
        this.onLoseListeners = [];
        this.setupNewGame();
    }

    setupNewGame(){
        this.board = [];
        for(var i = 0; i < this.size*this.size; i++){
            this.board[i] = 0;
        }
        this.addRandomTile(2);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.gameState = this.getGameState();
    }

    addRandomTile(amt){
        var seed = Math.random();
        var seed2 = Math.random();
        if(amt == 2){
            //put 2 new tiles
            do{
                var set1 = Math.floor(Math.random()*this.size*this.size);
                var set2 = Math.floor(Math.random()*this.size*this.size);
            }
            while(set2 == set1 || this.board[set1] != 0 || this.board[set2] != 0);
            this.board[set1] = (seed < 0.9 ? 2 : 4);
            this.board[set2] = (seed2 < 0.9 ? 2 : 4);
        }
        else{
            //put a new tile
            do{
                var s = Math.floor(Math.random()*this.size*this.size);
            }
            while(this.board[s] != 0);
            this.board[s] = (seed < 0.9 ? 2 : 4);
        }

    }

    loadGame(gameState){
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
    }

    move(direction){
        // have to add a boolean for if any object moved, and have that dictate whether or not to add a new tile.
        var sthMoved = false;
        if(this.over == false){
            switch (direction){
                case 'right':
                    for(var x = this.size-1; x < this.size*this.size; x+= this.size){
                        for(var i = x; i > x - this.size; i--){
                            //slide as much as possible
                            var t = i;
                            //console.log("1: " + x + ", " + i);
                            while(this.board[t] != 0 && this.board[t+1] == 0 && t < x){
                                this.board[t+1] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t++;
                            }
                        }
                        //for each row
                        for(var i = x - 1; i > x - this.size; i--){
                            //for each entry in the row, starting with the second-to-last number to the right
                            //check if tiles can absorb can absorb
                            if(this.board[i+1] == this.board[i] && this.board[i] != 0){
                                //two adjacent ones are equal, combine
                                sthMoved = true;
                                this.board[i+1] = 2*this.board[i+1];
                                this.score += this.board[i+1];
                                this.board[i] = 0;
                            }    
                        }
                        for(var i = x; i > x - this.size; i--){
                            //slide as much as possible
                            var t = i;

                            while(this.board[t] != 0 && this.board[t+1] == 0 && t < x){
                                this.board[t+1] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t++;
                            }
                        }

                    }
                    break;
                case 'left':
                    for(var x = 0; x < this.size*this.size; x += this.size){
                        //slide as much as possible
                        for(var i = x + 1; i < x + this.size; i++){
                            var t = i;

                            while(this.board[t] != 0 && this.board[t-1] == 0 && t > x){
                                this.board[t-1] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t--;
                            }          
                        }
                        //for each row
                        for(var i = x+1; i < x+this.size; i++){
                            //for each entry in the row, starting with the second number to the left
                            if(this.board[i-1] == this.board[i] && this.board[i] != 0){
                                //two adjacent ones are equal, combine
                                this.board[i-1] = 2*this.board[i-1];
                                this.score += this.board[i-1];
                                this.board[i] = 0;
                                sthMoved = true;
                            }
                        } 
                        for(var i = x + 1; i < x + this.size; i++){
                            var t = i;

                            while(this.board[t] != 0 && this.board[t-1] == 0 && t > x){
                                this.board[t-1] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t--;
                            }          
                        } 
          
                    }
                    break;
                case 'up':
                    for(var x = 0; x < this.size; x++){
                        //slide as much as possible
                        for(var i = x + this.size; i <= x + this.size*this.size-this.size; i += this.size){
                            var t = i;  
                            while(this.board[t] != 0 && this.board[t-this.size] == 0 && t > x){
                                this.board[t-this.size] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t -= this.size;
                            }
                        }
                        //for each column
                        for(var i = x; i <= x + this.size*this.size-this.size; i += this.size){
                            //for each entry in the column, starting with the second number from bottom
                            //check if tiles can absorb can absorb
                            if(this.board[i-this.size] == this.board[i] && this.board[i] != 0){
                            //two adjacent ones are equal, combine
                            this.board[i-this.size] = 2*this.board[i-this.size];
                            this.score += this.board[i-this.size];
                            this.board[i] = 0;
                            sthMoved = true;

                            } 
                        } 
                        for(var i = x + this.size; i <= x + this.size*this.size-this.size; i += this.size){
                            var t = i;

                            while(this.board[t] != 0 && this.board[t-this.size] == 0 && t > x){
                                this.board[t-this.size] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t -= this.size;
                            }
                        }  
                    }
                    break;
                case 'down':
                    for(var x = 0; x < this.size; x++){
                          //slide as much as possible 
                        for(var i = x + (this.size - 2)*this.size; i >= x; i -= this.size){
                            var t = i;  

                            while(this.board[t] != 0 && this.board[t+this.size] == 0 && t <= x + (this.size*this.size-this.size)){
                                this.board[t+this.size] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t+=this.size;
                            }
                        }
                        //for each column
                        for(var i = x + this.size*this.size-this.size; i >= x; i -= this.size){
                            //for each entry in the column, starting with the second number down
                            //check if tiles can absorb can absorb
                            if(this.board[i+this.size] == this.board[i] && this.board[i] != 0){
                                //two adjacent ones are equal, combine
                                this.board[i+this.size] = 2*this.board[i+this.size];
                                this.score += this.board[i+this.size];
                                this.board[i] = 0;
                                sthMoved = true;
                            } 
                        } 
                        for(var i = x + (this.size - 2)*this.size; i >= x; i -= this.size){
                            var t = i;  

                            while(this.board[t] != 0 && this.board[t+this.size] == 0 && t >= 0){
                                this.board[t+this.size] = this.board[t];
                                this.board[t] = 0;
                                sthMoved = true;
                                t+=this.size;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            if(sthMoved == true){
                this.addRandomTile();
            }
            var movePossible = false;
            for(var j = 0; j < this.size*this.size - 1; j++){

                if(this.board[j] == 2048 && this.won == false){
                    this.won = true;

                    this.gameState.board = this.board;
                    this.gameState.won = this.won;
                    this.gameState.over = this.over;
                    this.gameState.score = this.score;
                    this.onWinListeners.forEach(function(item){
                        item(this.getGameState());
                    }, this);  
                }
                // if any 0s are still on the board:
                if(this.board[j] == 0){
                    movePossible = true;
                }
            }
            //check if any moves are remaining AKA see if the game is over, if you lose/win
            //checking row moves:
            for(var i = 0; i < this.board.length; i += this.size){
                var t = i;
                while(t < i + this.size - 1){
                    if(this.board[t] == this.board[t+1] || this.board[t+1] == 0 || this.board[t] == 0){
                        movePossible = true;
                    }
                    t++;
                }
            }
            //checking column moves:
            for(var i = 0; i < this.size; i++){
                var t = i;
                while(t < i + this.size*this.size - this.size){
                    if(this.board[t] == this.board[t+this.size] || this.board[t+this.size] == 0 || this.board[t] == 0){
                        movePossible = true;
                    }
                    t += this.size;
                }
            }

            if(movePossible == false && this.won == false){
                this.over = true;
                this.gameState.board = this.board;
                this.gameState.won = this.won;
                this.gameState.over = this.over;
                this.gameState.score = this.score;
                this.onLoseListeners.forEach(function(item){
                    item(this.getGameState());
                }, this);            
            }
            this.onMoveListeners.forEach(function(item){
                item(this.getGameState());
            }, this);

        }
        
        
    }

    onMove(callBack){
        //store the callback. then, in my move function, call the callback each time.
        this.onMoveListeners.push(callBack);
    }

    onWin(callBack){
        this.onWinListeners.push(callBack);
    }

    onLose(callBack){
        this.onLoseListeners.push(callBack);
    }

    updateGameState(){
        this.gameState.board = this.board;
        this.gameState.won = this.won;
        this.gameState.over = this.over;
        this.gameState.score = this.score;
    }

    getGameState(){
        var gameState = {
            board: this.board,
            won: this.won,
            over: this.over,
            score: this.score,
        };
        this.gameState = gameState;

        return this.gameState;
    }

    // Testing purposes function below:
    toString(){
        var returnStr = "";
        for(var i = 0; i < this.board.length; i++){
            returnStr = returnStr.concat(" " + (this.board[i] != 0 ? this.board[i] : ".") + " ");
            if(i % this.size == this.size - 1){ returnStr = returnStr.concat('\n')};
        }
        returnStr = returnStr.concat("\nScore: " + this.score);
        return returnStr;
    }

}

