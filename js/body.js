document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById("gameGrid");

    const ROWS = 11;
    const COLS = 11 ;
    const gridData = [];

    // Generate Grid Data
    for (let row = 0; row < ROWS; row++) {
        gridData[row] = [];
        for (let col = 0; col < COLS; col++) {
            if (row % 2 === 1 && col % 2 === 1) {
                gridData[row][col] = "solid"; // Solid wall
            } else {
                gridData[row][col] = Math.random() < 0.3 ? "soft" : "empty"; // 30% chance of breakable walls
            }
        }
    }

    let palyerrow, palyercolom;
    

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
});

document.addEventListener("keydown", (event) => {
    const palyercell = document.querySelector(".player");
    if (!palyercell) return;

    let palyerrow = parseInt(palyercell.dataset.row);
    let palyercolom = parseInt(palyercell.dataset.col);

    let newrow = palyerrow;
    let newcol = palyercolom;

    switch (event.key) {
        case "ArrowUp":
            newrow = Math.max(0,  palyerrow -1);
            break
        case "ArrowDown":
            newrow = Math.min(10, palyerrow + 1);
            break
        case "ArrowLeft":
            newcol = Math.max(0, palyercolom - 1);
            break
        case "ArrowRight":
            newcol = Math.min(10, palyercolom + 1);
            break
            default:
            return;  
    }

    const targetcell = document.querySelector(`[data-row='${newrow}'][data-col='${newcol}']`);
    if (targetcell.classList.contains("solid") || targetcell.classList.contains("soft")) return;
    
    palyercell.classList.remove("player")
    targetcell.classList.add("player");
    targetcell.dataset.row = newrow; 
    targetcell.dataset.col = newcol;
});
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
        if (targetCell) {
            targetCell.classList.add("explosion");

            if (targetCell.classList.contains("soft")) {
                targetCell.classList.remove("soft");
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
    }, 200 );
}
