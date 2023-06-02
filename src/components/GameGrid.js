import { useState, useEffect } from "react";
import Box from "./Box";
import classes from './GameGrid.module.css'
import Modal from './Modal';
import NewGame from "./NewGame";
import EndGame from "./EndGame";

export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked"
}

function GameGrid(props) {
    const [currentgameGrid, setCurrentGameGrid] = useState([])
    const [boardSize, setBoardSize] = useState(7)
    const [numberOfMines, setNumberOfMines] = useState(5)
    const [render, setRender] = useState(false)
    const [clickRender, setClickRender] = useState(false)
    const [stepOnMine, setStepOnMine] = useState(false)
    const [gameIsActive, SetGameIsActive] = useState(true)
    const [modalIsVisable, setModalIsVisable] = useState(false)
    const [newGame, setNewGame] = useState(false)

    useEffect(() => {
        setCurrentGameGrid([])
        setStepOnMine(false)
        SetGameIsActive(true)
        setRender(!render)
    }, [boardSize,numberOfMines,newGame])

    useEffect(() => {
        createGrid()
    }, [render])

    useEffect(() => {
        const num = currentgameGrid.flat().filter((box) => box.show).length;
        if (num === ((boardSize * boardSize) - numberOfMines)) {
            setModalIsVisable(true)
        }
    }, [clickRender])

    const randomNumber = () => Math.floor(Math.random() * boardSize)
    const positionMatch = (a, b) => (a.x === b.x && a.y === b.y)

    function generateMines() {
        const positions = []
        while (positions.length < numberOfMines) {
            const position = {
                x: randomNumber(boardSize),
                y: randomNumber(boardSize)
            }
            if (!positions.some(p => positionMatch(p, position))) {
                positions.push(position)
            }
        }
        return positions
    }

    function nearbyTiles(board, tile) {
        const tiles = []
        let num = 0;
        for (let xOffset = -1; xOffset < 2; ++xOffset) {
            for (let yOffset = -1; yOffset < 2; ++yOffset) {
                const tmpTile = board[tile.x + xOffset]?.[tile.y + yOffset]
                if (tmpTile) tiles.push(tmpTile)
            }
        }
        for (let i = 0; i < tiles.length; ++i) {
            if (tiles[i].mine) {
                num += 1
            }
        }
        return num
    }

    function createGrid() {
        const newGrid = []
        const minePositions = generateMines()
        for (let x = 0; x < boardSize; ++x) {
            const row = []
            for (let y = 0; y < boardSize; y++) {
                let box = {
                    x: x,
                    y: y,
                    mine: minePositions.some(positionMatch.bind(null, { x, y })),
                    number: 0,
                    show: false
                }
                row.push(box)
            }
            newGrid.push(row)
        }
        newGrid.forEach((row) => row.forEach((box) => {
            box.number = nearbyTiles(newGrid, box)
        }))
        setCurrentGameGrid(newGrid)
    }

    function showNeighbors(x, y) {
        currentgameGrid[x][y].show = true
        const newGrid = [...currentgameGrid];

        const tiles = [];
        for (let xOffset = -1; xOffset < 2; xOffset++) {
            for (let yOffset = -1; yOffset < 2; yOffset++) {
                const tmpTile = newGrid[x + xOffset]?.[y + yOffset];
                if (tmpTile) tiles.push(tmpTile);
            }
        }
        const zeroTiles = tiles.filter((box) => box.number === 0);

        const showTiles = (x, y) => {
            const tile = newGrid[x]?.[y];
            if (tile && !tile.show && tile.number === 0) {
                tile.show = true;
                for (let xOffset = -1; xOffset < 2; xOffset++) {
                    for (let yOffset = -1; yOffset < 2; yOffset++) {
                        showTiles(x + xOffset, y + yOffset);
                    }
                }
            }
        };

        zeroTiles.forEach((box) => {
            showTiles(box.x, box.y);
        });

        setCurrentGameGrid(newGrid);
    }


    function submitNewGameHandler(gameData) {
        
        if(gameData.grid===boardSize &&gameData.mines===numberOfMines){
            setNewGame(!newGame)
        }

        setBoardSize(gameData.grid)
        setNumberOfMines(gameData.mines)
        props.hideModal()

    }


    return (
        <>

            {modalIsVisable && !stepOnMine &&
                <Modal>
                    <EndGame state='won' exitModal={() => setModalIsVisable(false)} />
                </Modal>
            }
            {modalIsVisable && stepOnMine &&
                <Modal>
                    <EndGame state='lost' exitModal={() => setModalIsVisable(false)} />
                </Modal>
            }

            {props.newGame ? <Modal>
                <NewGame onSubmit={submitNewGameHandler} exitModal={props.hideModal} lastGrid={boardSize} lastMines={numberOfMines} ></NewGame>
            </Modal>
                : null
            }
            <div className={classes.board} style={{ "--size": boardSize }}>
                {currentgameGrid.length > 0 &&
                    currentgameGrid.map((row, rowIndex) =>
                        row.map((box, boxIndex) => (
                            <Box
                                Key={`${rowIndex}-${boxIndex}`}
                                mine={box.mine}
                                number={box.number}
                                stepOnMine={() => {
                                    SetGameIsActive(false)
                                    setStepOnMine(true)
                                }}
                                gameEnded={!gameIsActive}
                                activateNeighbors={() => showNeighbors(box.x, box.y)}
                                clicked={() => {
                                    currentgameGrid[box.x][box.y].show = true
                                    setClickRender(!clickRender)
                                }}
                                show={box.show} />
                        ))
                    )
                }
            </div>
        </>
    );
}

export default GameGrid;