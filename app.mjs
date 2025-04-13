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
        const key = `game_${gameData.title}`;
        if (!localStorage.getItem(key)) {
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
        }
    });
}

function loadGames() {
    games = getAllGames();
    renderGames();
}

function renderGames() {
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = "";

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
        ratingInput.addEventListener("change", () => {
            game.personalRating = Number(ratingInput.value);
            saveGame(game);
            renderGames();
        });
        gameDiv.appendChild(ratingLabel);
        gameDiv.appendChild(ratingInput);

        const playButton = document.createElement("button");
        playButton.textContent = "Play Count: " + game.playCount;
        playButton.addEventListener("click", () => {
            game.playCount++;
            saveGame(game);
            renderGames();
        });
        gameDiv.appendChild(playButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Game";
        deleteButton.addEventListener("click", () => {
            localStorage.removeItem(`game_${game.title}`);
            loadGames();
        });
        gameDiv.appendChild(deleteButton);

        gameList.appendChild(gameDiv);
    });
}

const sortByPlayCountButton = document.getElementById("sortByPlayCount");
sortByPlayCountButton.addEventListener("click", () => {
    games = games.sort((gameA, gameB) => gameB.playCount - gameA.playCount);
    renderGames();
});

const sortByRatingButton = document.getElementById("sortByRating");
sortByRatingButton.addEventListener("click", () => {
    games = games.sort((gameA, gameB) => gameB.personalRating - gameA.personalRating);
    renderGames();
});

const exportButton = document.getElementById("exportButton");
exportButton.addEventListener("click", () => {
    const jsonString = exportGamesToJSON();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-games.json";
    link.click();
    URL.revokeObjectURL(url);
});

const importInput = document.getElementById("importSource");
importInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonString = e.target.result;
            importGamesFromJSON(jsonString);
            loadGames();
        };
        reader.readAsText(file);
    }
});

const newGameForm = document.getElementById("newGameForm");
newGameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const title = document.getElementById("newTitle").value.trim();
    const designer = document.getElementById("newDesigner").value.trim();
    const artist = document.getElementById("newArtist").value.trim();
    const publisher = document.getElementById("newPublisher").value.trim();
    const year = document.getElementById("newYear").value;
    const players = document.getElementById("newPlayers").value.trim();
    const time = document.getElementById("newTime").value.trim();
    const difficulty = document.getElementById("newDifficulty").value.trim();
    const url = document.getElementById("newUrl").value.trim();
    const playCount = Number(document.getElementById("newPlayCount").value);
    const personalRating = Number(document.getElementById("newPersonalRating").value);
    
    if (!title || !players) {
        alert("Please procie at least the title nad platers.");
        return;
    }
    
    const newGame = new Game(
        title,
        designer,
        artist,
        publisher,
        year,
        players,
        time,
        difficulty,
        url,
        playCount,
        personalRating
    );
    saveGame(newGame);
    
    loadGames();
    
    newGameForm.reset();
});

loadGames();
