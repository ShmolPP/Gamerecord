import Game from './models/game.mjs';

console.log("GameRecord app initialized");

let games = [];

function saveGame(game) {
    const key = `game_${game.title}`; 
    localStorage.setItem(key, JSON.stringify(game));
}

function getAllGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("game_")) {
            const gameData = JSON.parse(localStorage.getItem(key));
            const game = new Game(
                gameData.title,
                gameData.designer,
                gameData.artist,
                gameData.publisher,
                gameData.year,
                gameData.players,
                gameData.time,
                gameData.difficulty,
                gameData.url,
                gameData.playCount,
                gameData.personalRating
            );
            games.push(game);
        }
    }
    return games;
}

function exportGamesToJSON() {
    const games = getAllGames();
    return JSON.stringify(games, null, 2); 
}

function importGamesFromJSON(jsonString) {
    const gamesData = JSON.parse(jsonString);
    gamesData.forEach(gameData => {
        const game = new Game(
            gameData.title,
            gameData.designer,
            gameData.artist,
            gameData.publisher,
            gameData.year,
            gameData.players,
            gameData.time,
            gameData.difficulty,
            gameData.url,
            gameData.playCount,
            gameData.personalRating
        );
        saveGame(game);
    });
}

function loadGames() {
    games = getAllGames();
    renderGames(); // Show the games on the page
}

function renderGames() {
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = ""; // Clear the list so we don’t show games twice

    games.forEach(game => {
        const gameDiv = document.createElement("div");
        gameDiv.className = "game";

        const title = document.createElement("h2");
        title.textContent = game.title;
        gameDiv.appendChild(title);

        const ratingLabel = document.createElement("label");
        ratingLabel.textContent = "Rating: ";
        const ratingInput = document.createElement("input");
        ratingInput.type = "range";
        ratingInput.min = "0";
        ratingInput.max = "10";
        ratingInput.value = game.personalRating;
        ratingInput.disabled = true; // Can’t move it yet
        gameDiv.appendChild(ratingLabel);
        gameDiv.appendChild(ratingInput);

        const playButton = document.createElement("button");
        playButton.textContent = "Play Count: " + game.playCount;
        playButton.disabled = true; // Can’t click it yet
        gameDiv.appendChild(playButton);

        gameList.appendChild(gameDiv);
    });
}

loadGames();

const importInput = document.getElementById("importSource");
importInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonString = e.target.result;
            importGamesFromJSON(jsonString);
            loadGames(); // This will also call renderGames()
        };
        reader.readAsText(file);
    }
});