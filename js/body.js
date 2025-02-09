const map = [[1,1,0,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1]]

const box = document.getElementById("box")
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
        const div = document.createElement("div")
        if(map[i][j] == 1) {
            div.style.display = "block"
        }else {
            div.style.visibility = "hidden"
            // div.style.color = "red"
        }
        div.className = "style"
        box.append(div)
    }
}