/* global ctx */
// This class requires an update(), render() and
// a handleInput() method.
function Player(name) {
    if (typeof name === "undefined") throw Error("'name' undefined!");
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 65;
    this.sprite = 'images/char-boy.png';
    this.xMovement = 100;
    this.yMovement = 85;

    this.leftAdj = 20;
    this.rightAdj = 70;
    this.topAdj = 70;
    this.bottomAdj = 125;

    this.firsttime = true;
};

// see oop-help.js
extend(Player, GameEntity);

// Per Mozilla reference, this is a preferred way to add methods
// because it appends to prototype instead of replacing it.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
(function () {
    
    this.update = function () {
        if (this.firsttime) {
            this.reset();
            this.firsttime = false;
        }
    };

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // Used for debugging to know where the real borders.
        // ctx.fillRect(this.GetLeft(), this.GetTop(), 10, 10);
        // ctx.fillRect(this.GetRight(), this.GetBottom(), 10, 10);
    };

    this.reset = function () {
        this.x = 200;
        this.y = 413;
    }

    this.isMoveAllowed = function (direction) {
        // abort with error right away if this parameters not provided.
        if (typeof direction === "undefined") throw Error("'direction' not defined!");

        switch (direction) {
            case 'left': return this.x > 0;
            case 'right': return this.x + this.xMovement * 2 < canvas.width; // will it fit entirely?
            case 'up': return this.y > 0;
            case 'down': return this.y + this.yMovement * 3 < canvas.height; // will it fit entirely?
            default: return false;
        }
    };

    // Handles processing for valid keystrokes.
    this.handleInput = function (keypress) {
        // Fail the code if we get something unexpected so we
        // try to fix the code ASAP instead of just working with bad data.
        if (typeof keypress === "undefined") {
            throw Error("'keypress' undefined.")
        }
        if (this.isMoveAllowed(keypress)) {
            switch (keypress) {
                case 'left': this.x -= this.xMovement; break;
                case 'right': this.x += this.xMovement; break;
                case 'up': this.y -= this.yMovement; break;
                case 'down': this.y += this.yMovement; break;
            }
        }
        //console.log("x: " + this.x + " y: " + this.y);
    };

}).call(Player.prototype);
