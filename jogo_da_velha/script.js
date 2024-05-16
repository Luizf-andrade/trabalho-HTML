const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

//posições possiveis para ganhar o jogo 
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]; 

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item, index) => {
        item.innerHTML = "";
        item.setAttribute("data-i", index);
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {   
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);
    
    //esse for vai pecorrer as posições que e possivel ter um ganhador 
    for (pos of positions) {
        if (pos.every((item) => items.includes(item - 1))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE");
        init();
        return;
    }
}
