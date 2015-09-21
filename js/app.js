// Enemies our player must avoid
// row: which row to be placed in. 1 is top, 3 is bottom.
// startDelay: how many enemy lengths to delay from starting.
var Enemy = function(name, row, startDelay) {
    // abort with error right away if this parameters not provided.
    if (typeof row === "undefined") throw Error("'row' not defined!");
    if (typeof name === "undefined") throw Error("'name' undefined!");
    if (typeof startDelay === "undefined") throw Error("'startDelay' undefined!");

    // // make optional argument with a default value if not provided.
    // if (typeof startDelay === "undefined") startDelay = 1;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.name = name;

    // Defining some constants.
    // Enough off screen to provide for smooth entry
    this.spriteWidth = 100;
    this.rowHeight = 85;
    this.direction = 1;
    this.buffer = 10; // for some extra padding on some positioning.

    this.x = 0;
    this.y = row * this.rowHeight - 25; // adjust 25 to fit into row.
    // we'll use the row to indicate what speed the enemy is traveling.
    this.speed = (4 - row) * this.direction;

    this.width = 100;
    this.height = 85;

    this.leftAdj = 10;
    this.rightAdj = 80;
    this.topAdj = 80;
    this.bottomAdj = 130;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.startDelay = startDelay;
    this.delayMax = 5; // kind of like making the canvas size bigger than visible area.

    if (row === 2) {
        this.direction = -1; // go right to left in row 2.
        this.sprite = 'images/enemy-bug-left.png';
    }

    this.firstTime = true;
};

// see oop-help.js
extend(Enemy, GameEntity);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Just guessing on some numbers.
    this.x = this.x + this.speed * dt * 50 * this.direction;

    if (this.isReadyForReset()) { this.reset(); }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    if (this.firstTime) {
        this.reset();
        this.firstTime = false;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    // Used for debugging to know where the real borders.
    // ctx.fillRect(this.GetLeft(), this.GetTop(), 10, 10);
    // ctx.fillRect(this.GetRight(), this.GetBottom(), 10, 10);
    
    // NOTE: Initially was doing the scale thing to draw the image backwards, but figuring out the different X and Y
    // values were confusing plus also found articles that complained about performance. So instead I flipped
    // the image and saved it to just use that.
    // ctx.save();
    // if (this.direction < 0) {
    //     ctx.scale(-1, 1);
    //     ctx.drawImage(Resources.get(this.sprite), 0 - this.x, this.y);
    // }
    // else {
        // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // }
    // if (this.direction < 0) ctx.restore();

};

// where to put the enemies when they are off screen.
Enemy.prototype.reset = function () {
    if (this.direction > 0) {
        this.x = 0 - this.spriteWidth * this.startDelay - this.buffer;
    }
    else {
        this.x = canvas.width + this.spriteWidth * this.startDelay + this.buffer;
    }
};

// Not exactly just off sceen. Need to allow bugs to move their "start delay" distance.
Enemy.prototype.isReadyForReset = function () {
    var delay = this.delayMax - this.startDelay;
    var delayX = delay * this.spriteWidth;
    if (this.direction > 0 && this.x > canvas.width + delayX) return true;
    else if (this.direction < 0 && this.x < 0 - this.spriteWidth - delayX) return true;
    return false;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// SEE js/player.js

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy("Waldo", 1, 1),
    new Enemy("Katrina", 3, 1),
    new Enemy("Alex", 1, 4),
    new Enemy("Walle", 3, 4),
    new Enemy("Larry", 2, 1),
    new Enemy("bozo", 2, 3)
];

var player = new Player("Jelly Bean"); // player.js

// setup Kibo to disable some default keys so the web page does not move.
var k = new Kibo();
k.down('down', function () { return false; });
k.down('up', function () { return false; });
k.down('left', function () { return false; });
k.down('right', function () { return false; });

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    //console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // I don't like calling a function if we know we don't have something
    // valid to call it with. We either know what is valid here and
    // enforce it, or we don't do it here at all and do it in
    // handleInput().
    var key = allowedKeys[e.keyCode];
    if (typeof key !== "undefined") {
        player.handleInput(key);
    }
});

