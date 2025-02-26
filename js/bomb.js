import { cols, rows } from "./body.js";

export function Bomb() {
    document.addEventListener("keydown", (event) => {
        if (event.code !== "Space") return;

        const playerCell = document.querySelector(".player");
        if (!playerCell) return;

        if (playerCell.classList.contains("bomb")) return;

        playerCell.classList.add("bomb");

        setTimeout(() => {
            explodeBomb(playerCell);
        }, 1000);
    });
}

function explodeBomb(bombCell) {
    if (!bombCell) return;

    bombCell.classList.remove("bomb");

    let bombRow = parseInt(bombCell.dataset.row);
    let bombCol = parseInt(bombCell.dataset.col);

    let explosionRange = [
        { row: bombRow, col: bombCol },
        { row: bombRow - 1, col: bombCol },
        { row: bombRow + 1, col: bombCol },
        { row: bombRow, col: bombCol - 1 },
        { row: bombRow, col: bombCol + 1 }
    ];

    explosionRange.forEach(({ row, col }) => {
        let targetCell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        console.log(rows, cols);

        if (rows == row && col == cols && targetCell) {
            targetCell.classList.remove("soft-portal", "soft");
            targetCell.classList.add("portal");
            targetCell.classList.add("explosion");
        }
        if (targetCell) {
            targetCell.classList.add("explosion");
            if (targetCell.classList.contains("soft") || targetCell.classList.contains("enemy")) {
                targetCell.classList.remove("soft", "enemy");
                targetCell.classList.add("empty");
            }
        }
    });

    setTimeout(() => {
        explosionRange.forEach(({ row, col }) => {
            let targetCell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (targetCell) {
                targetCell.classList.remove("explosion");
            }
        });
    }, 200);
}