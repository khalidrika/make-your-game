export function PlayerMove() {
    document.addEventListener("keydown", (event) => {
        const playerCell = document.querySelector(".player");
        if (!playerCell) return;

        let playerRow = parseInt(playerCell.dataset.row);
        let playerCol = parseInt(playerCell.dataset.col);

        let newRow = playerRow;
        let newCol = playerCol;

        switch (event.key) {
            case "ArrowUp":
                newRow = Math.max(0, playerRow - 1);
                break;
            case "ArrowDown":
                newRow = Math.min(11, playerRow + 1);
                break;
            case "ArrowLeft":
                newCol = Math.max(0, playerCol - 1);
                break;
            case "ArrowRight":
                newCol = Math.min(11, playerCol + 1);
                break;
            default:
                return;
        }

        const targetCell = document.querySelector(`[data-row='${newRow}'][data-col='${newCol}']`);
        if (targetCell.classList.contains("solid") || targetCell.classList.contains("soft")) return;

        if (targetCell.classList.contains("enemy")) {
            alert("Game Over! You were caught by the enemy.");
            window.location.reload(); // Restart the game
            return;
        }

        playerCell.classList.remove("player");
        targetCell.classList.add("player");
        targetCell.dataset.row = newRow;
        targetCell.dataset.col = newCol;
    });
}