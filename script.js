let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return (
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0')
    );
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 1000);
        running = true;
        startBtn.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        running = false;
        startBtn.textContent = "Start";
    }
});

lapBtn.addEventListener("click", () => {
    if (running) {
        const li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        laps.appendChild(li);
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    startBtn.textContent = "Start";
});

/* Keyboard shortcuts */
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") startBtn.click();
    if (e.key.toLowerCase() === "r") resetBtn.click();
});
