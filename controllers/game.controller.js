var canvas,
    ctx,
    width = 600,
    height = 600,
    robotTotal = 5,
    robots = [],
    robot_y = 50,
    robot_x = -45,
    robot_h = 38,
    robot_w = 50,
    speed = 3,
    robot,
    tonys = [5],
    tony,
    tony_x = 400,
    tony_y = 50,
    tony_w = 50,
    tony_h = 38,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    llama,
    llama_x = (width / 2) - 25, llama_y = height - 75, llama_w = 50, llama_h = 57,
    score = 0,
    alive = true,
    hasGameStarted = false;

for (var i = 0; i < robotTotal; i++) {

    robots.push([robot_y, robot_x, robot_h, robot_w, speed]);
    robot_y += robot_h + 60;
    tonys.push([tony_y, tony_x, tony_h, tony_w, speed]);
    tony_y += tony_h + 60;
}

function clearCanvas() {
    ctx.clearRect(0,0,width,height);
}

function drawrobots() {
    for (var i = 0; i < robots.length; i++) {
        ctx.drawImage(robot, robots[i][1], robots[i][0]);
    }
}

function drawllama() {
    if (rightKey) llama_y += 5;
    else if (leftKey) llama_y -= 5;
    if (upKey) llama_x -= 5;
    else if (downKey) llama_x += 5;
    if (llama_x <= 0) llama_x = 0;
    if ((llama_x + llama_w) >= width) llama_x = width - llama_w;
    if (llama_y <= 0) llama_y = 0;
    if ((llama_y + llama_h) >= height) llama_y = height - llama_h;
    ctx.drawImage(llama, llama_y, llama_x);

}

function drawTony() {
    ctx.drawImage(tony, tony_y, tony_x );
}

function tonyCollision() {
    var tonyHit = 0;
    var tony_xw = tony_x + tony_w,
        tony_yh = tony_y + tony_h;
    for (var i = 0; i < robots.length; i++) {
        if (tony_x > robots[i][0] && tony_x < robots[i][0] + robot_h && tony_y > robots[i][1] && tony_y < robots[i][1] + robot_w) {
            robots.splice(i, 1);
            alive = false;
        }
        else if (tony_xw < robots[i][0] + robot_h && tony_xw > robots[i][0] && tony_y > robots[i][1] && tony_y < robots[i][1] + robot_w) {
            robots.splice(i, 1);
            alive = false;
        }



        else if (tony_yh > robots[i][1] && tony_yh < robots[i][1] + robot_w && tony_x > robots[i][0] && tony_x < robots[i][0] + robot_h) {
            robots.splice(i, 1);
            alive = false;
        }
        else if (tony_yh > robots[i][1] && tony_yh < robots[i][1] + robot_w && tony_xw < robots[i][0] + robot_h && tony_xw > robots[i][0]) {
            robots.splice(i, 1);
            alive = false;
        }
    }
}

function moverobots() {
    for (var i = 0; i < robots.length; i++) {
        if (robots[i][1] < height) {
            robots[i][1] += robots[i][4];
        } else if (robots[i][1] > height - 1) {
            robots[i][1] = -45;
        }
    }
}

function llamaCollision() {
    var llama_xw = llama_x + llama_w,
        llama_yh = llama_y + llama_h;
    for (var i = 0; i < robots.length; i++) {
        if (llama_x > robots[i][0] && llama_x < robots[i][0] + robot_h && llama_y > robots[i][1] && llama_y < robots[i][1] + robot_w) {
            robots.splice(i, 1);
            score += 10;
            robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
        }
        else if (llama_xw < robots[i][0] + robot_h && llama_xw > robots[i][0] && llama_y > robots[i][1] && llama_y < robots[i][1] + robot_w) {
            robots.splice(i, 1);
            score += 10;
            robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);

        }
        else if (llama_yh > robots[i][1] && llama_yh < robots[i][1] + robot_w && llama_x > robots[i][0] && llama_x < robots[i][0] + robot_h) {
            robots.splice(i, 1);
            score += 10;
            robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
        }
        else if (llama_yh > robots[i][1] && llama_yh < robots[i][1] + robot_w && llama_xw < robots[i][0] + robot_h && llama_xw > robots[i][0]) {
            robots.splice(i, 1);
            score += 10;
            robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
        }
    }
}

function scoreTotal() {
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ', 490, 30);
    ctx.fillText(score, 550, 30);
    if (!alive) {
        ctx.fillText('Game Over!', 245, height / 2);
    }
}

function init() {
    canvas = document.getElementById("canvasnew");
    console.log("game canvas = " +canvas);
    ctx = canvas.getContext('2d');
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('ROBOTS ARE TAKING OVER THE DTLV', width/10, 100);
    ctx.font = 'bold 15px Arial';
    ctx.fillText('Tony is working on a way to completely disable the robot army', width/10, 150);
    ctx.fillText('If tony dies the world will come to an end', width/10, 200);
    ctx.fillText('The majestic llama is furious is going to help save the world', width/10, 250);
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 35px Arial';
    ctx.fillText('RAGE MODE ON!!!', width/4, 300);
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#ADD8E6';
    ctx.fillText('USE ARROW KEYS TO USE LLAMA TO ATTACK ROBOTS', width/10, 350);
    ctx.font = 'bold 25px Arial';
    ctx.fillText('PRESS SPACEBAR TO BEGIN', width/6, 400);
    robot = new Image();
    robot.src = '../assets/robot_pic.png';
    llama = new Image();
    llama.src = '../assets/crazyllama.png';
    tony = new Image();
    tony.src= '../assets/tony.png';
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
}
function gameLoop() {
    hasGameStarted = true;
    clearCanvas();
    if (alive) {
        llamaCollision();
        tonyCollision();
        moverobots();
        drawrobots();
        drawTony();
        drawllama();
    }
    scoreTotal();
    game = setTimeout(gameLoop, 1000 / 30);
}

function keyDown(e) {
    if (e.keyCode == 39) rightKey = true;
    else if (e.keyCode == 37) leftKey = true;
    if (e.keyCode == 38) upKey = true;
    else if (e.keyCode == 40) downKey = true;
    else if(e.keyCode == 32 && !hasGameStarted) gameLoop();
}

function keyUp(e) {
    if (e.keyCode == 39) rightKey = false;
    else if (e.keyCode == 37) leftKey = false;
    if (e.keyCode == 38) upKey = false;
    else if (e.keyCode == 40) downKey = false;
}

(function () {
    angular
        .module("myApp")
        .controller("llamaController", llamaController);

    function llamaController($scope) {
        console.log("in game");
        init();
    }
})();