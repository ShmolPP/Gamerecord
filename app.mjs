import Game from './models/game.mjs';

console.log("GameRecord app initialized");

function saveGame(game) {
    const key = `game_${game.title}`; // Unique key for each game
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
    return JSON.stringify(games, null, 2); // Pretty print with indentation
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