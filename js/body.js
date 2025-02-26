import { Bomb } from "./bomb.js";
import { Draw } from "./draw.js";
import { MoveEnemy } from "./enemy.js";
import { PlayerMove } from "./player.js";

export let cols, rows
const gridElement = document.getElementById("gameGrid");

export let ROWS = 13;
export let COLS = 13;
export let gridData = [];
export let enemyrow, enemycol; 
export let portalrow, portalcol;
export let palyerrow, palyercolom

let score = 0;
let timeLeft = 120;

 document.addEventListener("DOMContentLoaded", () => {
     
     Draw();
     do {
        palyerrow = Math.floor(Math.random() * ROWS);
        palyercolom = Math.floor(Math.random() * COLS);
    } while (gridData[palyerrow][palyercolom] !== "empty");

     gridData[palyerrow][palyercolom] = "player";

    // Create Grid Cells
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", gridData[row][col]);
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridElement.appendChild(cell);
        }
    }
    //add div enemy
    do {
        enemyrow = Math.floor(Math.random() * ROWS);
        enemycol = Math.floor(Math.random() * COLS);
    } while (gridData[enemyrow][enemycol] !== "empty");

    gridData[enemyrow][enemycol] = "enemy";

    const enemycell = document.querySelector(`[data-row='${enemyrow}'][data-col='${enemycol}']`);

    if (enemycell) {
        enemycell.classList.add("enemy");
    }
    // add div  portal
    do {
        portalrow = Math.floor(Math.random() * ROWS);
        portalcol = Math.floor(Math.random() * COLS);
    } while (gridData[portalrow][portalcol] !== "soft");

    gridData[portalrow][portalcol] = "portal-gate";


    rows = portalrow
    cols = portalcol

    // const portalcell = document.querySelector(`[data-row='${portalrow}'][data-col='${portalcol}']`);
    // move player
    PlayerMove();

    // bomb
    Bomb();
    updateScoreAndTime();
    function updateEnemeis() {
        MoveEnemy();
        requestAnimationFrame(updateEnemeis);
    }
        requestAnimationFrame(updateEnemeis);
});

export function updateScoreAndTime() {
    const scoreElement = document.createElement("div");
    scoreElement.id = "score";
    scoreElement.textContent = `Score: ${score}`;
    document.body.appendChild(scoreElement);

    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.textContent = `Time Left: ${timeLeft}`;
    document.body.appendChild(timerElement);

    const timerInterval = setInterval(() =>{
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! game Over.");
            window.location.reload();
        }
    }, 1000)
}