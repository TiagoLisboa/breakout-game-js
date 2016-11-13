(function () {
    var canvas = document.getElementById('render');

    var ctx = canvas.getContext("2d");

    var game = {}

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

    function Ball (x, y, r, ctx) {
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

        this.update = function () {
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
    function Paddle (ctx) {
        this.w = 75;
        this.h = 10;
        this.x = (canvas.width-this.w)/2;
        this.y = canvas.height-this.h;

        this.draw = function () {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        this.update = function () {
            if (leftPressed) {
                this.x -= 2;
            }
            else if (rightPressed) {
                this.x += 2;
            }
        }
    }

    // Initing objects
    var ball = new Ball (canvas.width/2, canvas.height-30, 10, ctx);
    var paddle = new Paddle (ctx);

    // Game Loop

    game.draw = function (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        paddle.draw();
    }
    game.update = function (){
        ball.update();
        paddle.update();
    }
    setInterval(function () {
        game.draw();
        game.update();
    }, 10);
})();
