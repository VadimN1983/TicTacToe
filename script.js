'use strict';

const TicTacToe = {

    main     : document.querySelector('#tictactoe'),
    field    : null,
    matrix   : [],
    size     : (this.size >= 3) ? this.size : 3,
    winMoves : [],
    winner   : null,

    coord: function (i, x, y) {
        this.field[i].setAttribute('data-x', x);
        this.field[i].setAttribute('data-y', y);
    },

    /**
     * Winning combinations
     */
    winMatrix : function() {
        let win = [];

        // Winning parallel lines
        for(let y = 0; y < this.size; y++) {
            win[y] = [];
            for(let x = 0; x < this.size; x++) {
                win[y][x] = [y, x];
            }
        }
        this.winMoves = this.winMoves.concat(win);

        // Winning perpendicular lines
        for(let x = 0; x < this.size; x++) {
            win[x] = [];
            for(let y = 0; y < this.size; y++) {
                win[x][y] = [y, x];
            }
        }
        this.winMoves = this.winMoves.concat(win);

        // Winning cross lines
        for(let i = 0; i < this.size; i++) {
            win[i] = [i, i];
        }
        this.winMoves[this.winMoves.length] = win;

        for(let i = 0; i < this.size; i++) {
            win[i] = [(this.size-1)-i, i];
        }
        this.winMoves[this.winMoves.length] = win;
    },

    /**
     * Winning check
     */
    checkResult : function() {
        let hm = 0,
            ai = 0,
            cd = [];

        for(let x = 0; x < this.winMoves.length; x++) {
            hm = 0;
            ai = 0;

            for(let i = 0; i < this.winMoves[x].length; i++) {
                cd = this.winMoves[x][i];
                hm = (this.matrix[ cd[0] ][ cd[1] ] === 'X') ? ++hm : hm;
                ai = (this.matrix[ cd[0] ][ cd[1] ] === 'O') ? ++ai : ai;
            }

            if(hm === this.size || ai === this.size) {
                break;
            }
        }

        if(hm === this.size) {
            this.winner = 'HM';
        } else if(ai === this.size) {
            this.winner = 'AI';
        }
    },

    /**
     * Initial preparation of the game
     */
    init : function() {

        let position = 0;
        let i = Math.pow(this.size, 2);

        while(i-- > 0) {
            let block = document.createElement('div');
            block.className = 'field';
            this.main.appendChild(block);

            if(i%this.size === 0) {
                let br = document.createElement('div');
                br.style.clear = 'both';
                this.main.appendChild(br);
            }
        }

        this.field = document.querySelectorAll('.field');

        for (let k = 0; k < this.size; k++) {
            this.matrix[k] = [];
            for (let v = 0; v < this.size; v++) {
                this.matrix[k][v] = 0;
                this.coord(position++, v, k);
            }
        }

        this.winMatrix();
    },

    /**
     * Default parameters
     */
    default : function() {
        this.main.innerHTML = '';
        this.winner   = null;
        this.winMoves = [];
        this.matrix   = [];
    },

    /**
     * Start of the game
     */
    start : function() {

        this.default();
        this.init();

        for (const button of this.field) {
            button.addEventListener('click', function(e) {
                let coord_x = this.getAttribute('data-x');
                let coord_y = this.getAttribute('data-y');

                if (TicTacToe.matrix[coord_y][coord_x] === 0) {
                    TicTacToe.matrix[coord_y][coord_x] = 'X';
                    e.target.innerText = 'X';

                    TicTacToe.checkResult();

                    console.log(TicTacToe.winner);
                    console.log(TicTacToe.matrix);
                }
            });
        }
    },

    /**
     * Restart game
     */
    restart : function() {
        this.default();
        this.start();
    },
};

// Size of field
TicTacToe.size = 3;

// Initial preparation of the game
TicTacToe.init();

// Start game
TicTacToe.start();