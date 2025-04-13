
Step 2
- A Game class is located in the Game.mjs file and creates a board game type with title, creator, artist, publisher, year, players, time, difficulty, url, playCount, and personalRating attributes that correspond to example.json.

Step 3
  - "saveGame(game)": Saves a single game to localStorage using the game's title as part of the key. Games are stored as individual key/value pairs, not as an array.
- The function getAllGames() uses a loop to process "game_" prefixed keys that extracts JSON then restructures the data into Game objects.
- exportGamesToJSON(): Outputs all games as a JSON string, using`getAllGames() to get the data.
- importGamesFromJSON(jsonString): Parses a JSON string, creates Game objects, and saves each to localStorage using saveGame().

Step 4
Import Input in index.html:

- Added a file upload button to index.html with the id importSourc so users can pick a JSON file
- Added code in app.mjs to read the uploaded file and save the games to localStorage using the importGamesFromJSON() function from Step 3.
- Made a list called games in app.mjs to keep track of all games in memory.
A file upload button enables users to add games through JSON file upload such as example.json. Since the assignment required an input with the id importSource, I included that along with a helpful label, and I set the attribute accept=".json" to make sure only JSON files show up during file selection.  At the top of my file, I defined an array named games that saves all game data using let, because the list should be refreshed each time a new game is imported or loaded.

step 5
 I built a separate section to display games since users need to know what they have accessible right now. In index.html, I added a <div> section with the id gameList to follow the file import button. I added a range input for the rating but disabled it for now until its functionality is ready in Step 6. Similarly, I added a button to show the play count, hinting at future interactivity when tracking how many times a game has been played. I organized each game’s details into its own box by sequentially building a container for the title, slider, and button, and then inserting it into gameList.