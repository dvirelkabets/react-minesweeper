import { useState } from "react";
import classes from "./NewGame.module.css"


function NewGame(props){
    const [gridSize,setGridSize] = useState(props.lastGrid)
    const [minesNum,setMinesNum] = useState(props.lastMines)

    function changeGridHandler(event){
        setGridSize(Math.max(1,event.target.value))
    }

    function changeMineNumHandler(event){
        setMinesNum(Math.max(1,event.target.value))
    }

    function submitHandler(event){
        event.preventDefault()
        let newMines = minesNum;
        if ((gridSize*gridSize)<minesNum){
            newMines=(gridSize*gridSize)
            setMinesNum(newMines)
        }
        const gameData={
            grid: gridSize,
            mines: newMines
        }
        props.onSubmit(gameData)
        props.exitModal()
    }


    return (
        <form className={classes.form} onSubmit={(submitHandler)}>
            <p>
                <label htmlFor="gridSize">Grid size</label>
                <input type="number" id="size" min='1' defaultValue={props.lastGrid} onChange={changeGridHandler}/>
            </p>
            <p>
                <label htmlFor="minesSize"> how many mines?</label>
                <input type="number" id="mine" min='0' max={gridSize*gridSize} defaultValue={props.lastMines} onChange={changeMineNumHandler}/>
            </p>
            <p className={classes.actions}>
                <button type='button' onClick={props.exitModal}>Cancel</button>
                <button>Submit</button>
            </p>
        </form>
    )
}

export default NewGame;