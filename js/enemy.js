function MoveEnemy() {
    let EnemyCell = document.querySelector(".enemy")
    if (!EnemyCell) return
    let Enemyrow = parseInt(EnemyCell.dataset.row);
    let Enemycol = parseInt(EnemyCell.dataset.col);

    let possiblemove = [
        { row: Enemyrow - 1, col: Enemycol },
        { row: Enemyrow + 1, col: Enemycol },
        { row: Enemyrow, col: Enemycol - 1 },
        { row: Enemyrow, col: Enemycol + 1 }
    ];
    let validmove = possiblemove.filter(move => {
        let targetCell = document.querySelector(`[data-row='${move.row}'][data-col='${move.col}']`);
        return targetCell && targetCell.classList.contains("empty")
    });
    if (validmove.length === 0) return;

    let randommove = validmove[Math.floor(Math.random() * validmove.length)];
    let newEnemycell = document.querySelector(`[data-row='${randommove.row}'][data-col='${randommove.col}']`);
    if (newEnemycell) {
        EnemyCell.classList.remove("enemy");
        newEnemycell.classList.add("enemy");
    }
}

function updateEnemeis() {
    MoveEnemy();
    requestAnimationFrame(updateEnemeis);
}
requestAnimationFrame(updateEnemeis);