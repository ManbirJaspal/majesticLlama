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
    ship,
    ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 57,
    score = 0,
    alive = true;

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

function drawShip() {
 if (rightKey) ship_y += 5;
 else if (leftKey) ship_y -= 5;
 if (upKey) ship_x -= 5;
 else if (downKey) ship_x += 5;
 if (ship_x <= 0) ship_x = 0;
 if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
  if (ship_y <= 0) ship_y = 0;
 if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
  ctx.drawImage(ship, ship_y, ship_x);
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


function shipCollision() {
  var ship_xw = ship_x + ship_w,
      ship_yh = ship_y + ship_h;
  for (var i = 0; i < robots.length; i++) {
   if (ship_x > robots[i][0] && ship_x < robots[i][0] + robot_h && ship_y > robots[i][1] && ship_y < robots[i][1] + robot_w) { 
        robots.splice(i, 1);
        score += 10;
        robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
    }
    else if (ship_xw < robots[i][0] + robot_h && ship_xw > robots[i][0] && ship_y > robots[i][1] && ship_y < robots[i][1] + robot_w) {
        robots.splice(i, 1);
        score += 10;
        robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
     
    }
    else if (ship_yh > robots[i][1] && ship_yh < robots[i][1] + robot_w && ship_x > robots[i][0] && ship_x < robots[i][0] + robot_h) {
        robots.splice(i, 1);
        score += 10;
        robots.push([(Math.random() * 500) + 50, -45, robot_h, robot_w, speed]);
     }
    else if (ship_yh > robots[i][1] && ship_yh < robots[i][1] + robot_w && ship_xw < robots[i][0] + robot_h && ship_xw > robots[i][0]) {
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

  robot = new Image();
  robot.src = 'robot_pic.png';
  ship = new Image();
  ship.src = 'ship.png';
  tony = new Image();
    tony.src= 'robot_pic.png';
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
  gameLoop();
}
function gameLoop() {
  clearCanvas();
  if (alive) {
    shipCollision();
       tonyCollision();
    moverobots();
    drawrobots();
      drawTony();
      drawShip();  
  }
  scoreTotal();
  game = setTimeout(gameLoop, 1000 / 30);
}

function keyDown(e) {
  if (e.keyCode == 39) rightKey = true;
  else if (e.keyCode == 37) leftKey = true;
  if (e.keyCode == 38) upKey = true;
  else if (e.keyCode == 40) downKey = true;
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