// 获取canvas元素
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 设置canvas的宽度和高度为窗口的宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义蛇的初始位置和大小
var snakeSize = 10;
var snakeX = canvas.width / 2 - snakeSize / 2;
var snakeY = canvas.height / 2 - snakeSize / 2;

// 定义蛇的移动速度
var speed = 100;

// 定义蛇的身体
var snakeBody = [];

// 定义上一次鼠标移动的时间戳
var lastMouseMoveTime = 0;

// 定义隕石数组
var meteors = [];
// 定义隕石计数器和生成隕石的间隔
var meteorCounter = 0;
var meteorInterval = 50;

// 定义隕石的速度和方向
var meteorSpeed = 5;
var meteorDirection = { x: 1, y: 0 };

// 定义计时器变量和计时器元素
var timer = 0;
var timerElement = document.getElementById("timer");

// 每秒更新计时器
setInterval(function() {
    timer++;
    timerElement.innerHTML = "Time: " + timer + "s";
}, 1000);
// 监听鼠标移动事件
canvas.addEventListener("mousemove", function(event) {
    // 计算时间差
    var currentTime = new Date().getTime();
    var timeDiff = currentTime - lastMouseMoveTime;
    lastMouseMoveTime = currentTime;

    // 根据时间差计算移动距离
    var moveDistance = timeDiff * speed / 1000;

    // 更新蛇的位置
    var targetX = event.clientX - canvas.offsetLeft - snakeSize / 2;
    var targetY = event.clientY - canvas.offsetTop - snakeSize / 2;
    var deltaX = targetX - snakeX;
    var deltaY = targetY - snakeY;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance <= moveDistance) {
        snakeX = targetX;
        snakeY = targetY;
    } else {
        snakeX += moveDistance * deltaX / distance;
        snakeY += moveDistance * deltaY / distance;
    }
});

// 定义游戏循环
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 添加蛇头到身体数组中
    snakeBody.unshift({ x: snakeX, y: snakeY });

    // 绘制蛇的身体
    ctx.fillStyle = "green";
    for (var i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
    }

    // 如果蛇的身体长度大于5，删除最后一个坐标，实现蛇的尾巴效果
    if (snakeBody.length > 10) {
        snakeBody.pop();
    }
    meteorCounter++;
    // 随机生成隕石
    if (meteorCounter >= meteorInterval) {
        var meteorX = Math.random() * canvas.width;
        var meteorY = Math.random() * canvas.height;
        var meteorSize = Math.random() * 20 + 10;
        meteors.push({ x: meteorX, y: meteorY, size: meteorSize });
        // 重置隕石计数器
        meteorCounter = 0;
    }

    // 绘制隕石
    ctx.fillStyle = "gray";
    for (var i = 0; i < meteors.length; i++) {
        ctx.fillRect(meteors[i].x, meteors[i].y, meteors[i].size, meteors[i].size);
    }
    // 计算隕石的速度和方向
    if (meteors.length > 0) {
        var deltaX = snakeX - meteors[0].x;
        var deltaY = snakeY - meteors[0].y;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        meteorDirection.x = deltaX / distance;
        meteorDirection.y = deltaY / distance;
    }


    // 移动隕石
    for (var i = 0; i < meteors.length; i++) {
        meteors[i].x += meteorSpeed * meteorDirection.x;
        meteors[i].y += meteorSpeed * meteorDirection.y;

        // 检测蛇是否与隕石相撞
        if (snakeX < meteors[i].x + meteors[i].size &&
            snakeX + snakeSize > meteors[i].x &&
            snakeY < meteors[i].y + meteors[i].size &&
            snakeY + snakeSize > meteors[i].y) {
            alert("Game Over! Your time is " + timer + "s.");
            location.reload();
            return;
        }
    }
    // 循环调用游戏循环函数
    setTimeout(gameLoop, speed);
}

// 开始游戏循环
gameLoop();