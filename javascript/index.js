const playerFactory = (name) => {
    name = name;
    return { name };
}

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

})()

const Game = (() => {

    getPlayers = () => {
        const player1 = document.getElementById('player1');
        const player2 = document.querySelector('.board-wrapper');

        return player2
    }

    return { getPlayers }
})();


console.log(Game.getPlayers())