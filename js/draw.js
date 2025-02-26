import { COLS, gridData, ROWS } from "./body.js";


export function Draw(){
    for (let row = 0; row < ROWS; row++) {
        gridData[row] = [];
        for (let col = 0; col < COLS; col++) {
            if (row === 0 || col === 0 || row === 12 || col===12){
                gridData[row][col] = "solid"; // Solid wall
            }else if (row % 2 === 0 && col % 2 === 0) {
                gridData[row][col] = "solid"; // Solid wall
            } else {
                gridData[row][col] = Math.random() < 0.1 ? "soft" : "empty"; // 30% chance of breakable walls
            }
        }
    }

}