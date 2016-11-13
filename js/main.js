(function () {
    var canvas = document.getElementById('render');

    var ctx = canvas.getContext("2d");

    var game = {}
    game.v = 10;

    // Keys Listeners
    var rightPressed = false, leftPressed = false;

    function keyDown (e){
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUp (e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }

    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);

    // Ball constructor

    function Ball (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = 2;
        this.dy = -2;
        this.draw = function (){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        this.update = function (paddle) {
            if (this.y+this.dy == canvas.height-paddle.h-this.r &&
                this.x+this.dx > paddle.x-this.r &&
                this.x+this.dx < paddle.x+paddle.w+this.r) {

                this.dy = -this.dy;
            }
            var x = this.x + this.dx, y = this.y + this.dy, r = this.r;

            var hitBox = boxes.filter(function (index) {
                return x > index.x-r &&
                x < index.x+index.w+r &&
                y > index.y-r &&
                y < index.y+index.h+r;
            });

            boxes = boxes.filter(function (index) {
                return !(x > index.x-r &&
                x < index.x+index.w+r &&
                y > index.y-r &&
                y < index.y+index.h+r);
            });

            console.log(boxes.length);

            if (hitBox.length>0) {
                this.dy = -this.dy;
                this.dx = -this.dx;
            }

            if (this.y + this.dy > canvas.height-this.r) {
                clearInterval(game.loop);
            }

            if (this.y + this.dy < this.r ||
                this.y + this.dy > canvas.height-this.r){
                this.dy = -this.dy;
            }

            if (this.x + this.dx < this.r ||
                this.x + this.dx > canvas.width-this.r){
                this.dx = -this.dx;
            }

            this.y += this.dy;
            this.x += this.dx;
        }
    }

    // Paddle constructor
    function Paddle (v) {
        this.w = 75;
        this.h = 10;
        this.x = (canvas.width-this.w)/2;
        this.y = canvas.height-this.h;
        this.v = v;

        this.draw = function () {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        this.update = function () {
            if (leftPressed && this.x+this.v > 0) {
                this.x -= this.v;
            }
            else if (rightPressed && this.x-this.v < canvas.width-this.w) {
                this.x += this.v;
            }
        }
    }

    // Blocks constructor
    function Box (x, y, _ID){
        this.x = x;
        this.y = y;
        this.w = 78;
        this.h = 13;
        this._ID = _ID;

        this.draw = function () {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }

    // Initing objects
    var ball = new Ball (canvas.width/2, canvas.height-30, 10);
    var paddle = new Paddle (7);
    var boxes = [];

    var x = 0;
    for (var i = 0; i < 6; i ++) {
        for (var j = 0; j < 5; j ++){
            boxes[x] = new Box(i*80, j*15, x);
            x++;
        }
    }
    // Game Loop

    game.init = function () {

    }
    game.draw = function (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].draw();
        }
        ball.draw();
        paddle.draw();
    }
    game.update = function (){
        paddle.update();
        ball.update(paddle, boxes);
    }
    game.init();

    game.loop = setInterval(function () {
        game.draw();
        game.update();
    }, game.v);
})();
