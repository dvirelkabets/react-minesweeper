# Minesweeper React

This project is a simple Minesweeper game developed in React.

## Features

- A customizable grid size.
- A customizable number of mines.
- A flagging system to mark suspected mines.
- An endgame notification indicating if you won or lost.
- A "New Game" button to start a new game with current settings.

## Components

The game is structured with the following React components:

- `App`: This is the main component where the state of the modal windows (New Game, Game End) is managed.
- `MainHeader`: Contains the game title and the "New Game" button.
- `GameGrid`: Manages the game grid and game logic, including mine placement, tile click handling, and win/lose conditions.
- `Box`: Represents a single tile in the game grid, which can be either a mine or a number (indicating adjacent mines).
- `NewGame`: A form that allows users to specify the grid size and the number of mines for a new game.
- `EndGame`: Displays a message indicating whether the player won or lost the game.
- `Modal`: A reusable component for displaying modal windows.

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the application in a local development server

## How to Play

- Click on a tile to reveal what's underneath. If it's a mine, you lose the game. If it's a number, it indicates how many mines are in the adjacent tiles.
- Right click on a tile to flag it if you suspect a mine is underneath. Right click again to unflag.
- To win the game, reveal all the tiles that don't contain mines. 

Enjoy the game!
