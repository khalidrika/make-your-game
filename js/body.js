document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById("gameGrid");

    const ROWS = 11;
    const COLS = 11;
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

    // Create Grid Cells
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", gridData[row][col]);
            gridElement.appendChild(cell);
        }
    }
});
 