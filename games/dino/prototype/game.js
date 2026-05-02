const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const bestScoreDisplay = document.getElementById('best');
const startButton = document.getElementById('startButton');
const lane = document.getElementById('lane');
const specNote = document.getElementById('specNote');

let score = 0;
let timeLeft = 60;
let bestScore = localStorage.getItem('bestScore') || 0;

function updateDisplays() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    bestScoreDisplay.textContent = bestScore;
}

function startGame() {
    startButton.style.display = 'none';
    specNote.style.display = 'block';
    timeLeft = 60;
    score = 0;
    updateDisplays();
    createObstacles();
    setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplays();
        } else {
            gameover();
        }
    }, 1000);
}

function createObstacles() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (lane.offsetWidth - 50) + 'px';
    lane.appendChild(obstacle);

    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    function moveObstacle() {
        if (obstacleLeft > -50) {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            requestAnimationFrame(moveObstacle);
        } else {
            lane.removeChild(obstacle);
        }
    }
    moveObstacle();
}

function gameover() {
    startButton.style.display = 'block';
    specNote.style.display = 'none';
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
}

startButton.addEventListener('click', startGame);