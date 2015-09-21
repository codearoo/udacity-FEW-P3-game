function GameEntity() {

}

// Per Mozilla reference, this is a preferred way to add methods
// because it appends to prototype instead of replacing it.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
(function () {

    this.isOccupying = function (x, y) {
        if (typeof x === "undefined") throw Error("'x' undefined!");
        if (typeof y === "undefined") throw Error("'y' undefined!");

        if (typeof this.x === "undefined") throw Error("'this.x' undefined!");
        if (typeof this.y === "undefined") throw Error("'this.y' undefined!");

        //// need to do the math in () or it will cnocatenate strings.
        //console.log("Occupying: (" + this.x + "," + this.y + ")"
        //    + ", (" + (this.x + this.width) + "," + (this.y + this.height) + ")");

        //console.log("width: " + this.width + " height: " + this.height);

        return (this.GetLeft() <= x && x <= this.GetRight())
            && (this.GetTop() <= y && y <= this.GetBottom());
    };

    this.GetName = function () {
        if (typeof this.name === "undefined") throw Error("'this.name' undefined!");
        return this.name;
    }

    this.GetLeft = function () {
        if (typeof this.leftAdj === "undefined") throw Error("'this.leftAdj' undefined!");
        return this.x + this.leftAdj;
    }

    this.GetRight = function () {
        if (typeof this.rightAdj === "undefined") throw Error("'this.rightAdj' undefined!");
        return this.x + this.rightAdj;
    }

    this.GetTop = function () {
        if (typeof this.topAdj === "undefined") throw Error("'this.topAdj' undefined!");
        return this.y + this.topAdj;
    }

    this.GetBottom = function () {
        if (typeof this.bottomAdj === "undefined") throw Error("'this.bottomAdj' undefined!");
        return this.y + this.bottomAdj;
    }
    
    this.GetCenterX = function() {
        return (this.GetLeft() + this.GetRight()) / 2;
    }
    
    this.GetCenterY = function() {
        return (this.GetTop() + this.GetBottom()) / 2;
    }

}).call(GameEntity.prototype);
