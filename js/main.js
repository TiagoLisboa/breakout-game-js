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
            if (this.y+this.dy > canvas.height-paddle.h-this.r &&
                this.x+this.dx > paddle.x-this.r &&
                this.x+this.dx < paddle.x+paddle.w+this.r) {

                this.dy = -this.dy;
            }

            if (this.y + this.dy > canvas.height-this.r) {
                clearInterval(gameLoop);
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

    // Initing objects
    var ball = new Ball (canvas.width/2, canvas.height-30, 10);
    var paddle = new Paddle (7);

    // Game Loop

    game.draw = function (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        paddle.draw();
    }
    game.update = function (){
        paddle.update();
        ball.update(paddle);
    }
    var gameLoop = setInterval(function () {
        game.draw();
        game.update();
    }, game.v);
})();
