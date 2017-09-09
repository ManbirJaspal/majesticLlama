var canvas,
    ctx,
    width = 600,
    height = 600,
    enemyTotal = 5,
    enemies = [],
    enemy_x = 50,
    enemy_y = -45,
    enemy_w = 50,
    enemy_h = 38,
    speed = 3,
    enemy,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship,
    ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 57,
    laserTotal = 2,
    lasers = [],
    score = 0,
    alive = true;

for (var i = 0; i < enemyTotal; i++) {
 enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
 enemy_x += enemy_w + 60;
}

function clearCanvas() {
 ctx.clearRect(0,0,width,height);
}

function drawEnemies() {
 for (var i = 0; i < enemies.length; i++) {
   ctx.drawImage(enemy, enemies[i][0], enemies[i][1]);
 }
}

function drawShip() {
 if (rightKey) ship_x += 5;
 else if (leftKey) ship_x -= 5;
 if (upKey) ship_y -= 5;
 else if (downKey) ship_y += 5;
 if (ship_x <= 0) ship_x = 0;
 if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
  if (ship_y <= 0) ship_y = 0;
 if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
  ctx.drawImage(ship, ship_x, ship_y);
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
   if (enemies[i][1] < height) {
     enemies[i][1] += enemies[i][4];
   } else if (enemies[i][1] > height - 1) {
      enemies[i][1] = -45;
    }
  }
}

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
     ctx.fillStyle = '#f00';
     ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3])
   }
}
function moveLaser() {
 for (var i = 0; i < lasers.length; i++) {
   if (lasers[i][1] > -11) {
      lasers[i][1] -= 10;
    } else if (lasers[i][1] < -10) {
     lasers.splice(i, 1);
   }
 }
}

function hitTest() {
 var remove = false;
 for (var i = 0; i < lasers.length; i++) {
   for (var j = 0; j < enemies.length; j++) {
     if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
       remove = true;
        enemies.splice(j, 1);
        score += 10;
        enemies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed]);
      }
    }
    if (remove == true) {
      lasers.splice(i, 1);
      remove = false;
    }
  }
}

function shipCollision() {
  var ship_xw = ship_x + ship_w,
      ship_yh = ship_y + ship_h;
  for (var i = 0; i < enemies.length; i++) {
   if (ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w && ship_y > enemies[i][1] && ship_y < enemies[i][1] + enemy_h) {
     alive = false;
    }
    if (ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0] && ship_y > enemies[i][1] && ship_y < enemies[i][1] + enemy_h) {
     alive = false;
    }
    if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w) {
     alive = false;
    }
    if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0]) {
     alive = false;
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
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  enemy = new Image();
  enemy.src = '8bit_enemy.png';
  ship = new Image();
  ship.src = 'ship.png';
  //setInterval(gameLoop, 25);
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
  gameLoop();
}
function gameLoop() {
  clearCanvas();
  if (alive) {
    hitTest();
    shipCollision();
    moveLaser();
    moveEnemies();
    drawEnemies();
    drawShip();
    drawLaser();  
  }
  scoreTotal();
  game = setTimeout(gameLoop, 1000 / 30);
}

function keyDown(e) {
  if (e.keyCode == 39) rightKey = true;
  else if (e.keyCode == 37) leftKey = true;
  if (e.keyCode == 38) upKey = true;
  else if (e.keyCode == 40) downKey = true;
  if (e.keyCode == 88 && lasers.length <= laserTotal) lasers.push([ship_x + 25, ship_y - 20, 4, 20]);
}

function keyUp(e) {
  if (e.keyCode == 39) rightKey = false;
  else if (e.keyCode == 37) leftKey = false;
  if (e.keyCode == 38) upKey = false;
  else if (e.keyCode == 40) downKey = false;
}

window.onload = init;