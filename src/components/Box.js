import classes from './Box.module.css'
import { useState, useEffect } from 'react';
import { TILE_STATUSES } from './GameGrid';

function Box(props) {
    const [status, setStatus] = useState(TILE_STATUSES.HIDDEN)

    useEffect(()=>{
        if(props.show){
            showTile()
        }
    },[props.show])
    function markTile(event) {
        event.preventDefault()
        if (status === TILE_STATUSES.MARKED) {
            setStatus(TILE_STATUSES.HIDDEN)
        }
        else if (status === TILE_STATUSES.HIDDEN) {
            setStatus(TILE_STATUSES.MARKED)
        }
    }

    function showTile() {
        if (status === TILE_STATUSES.HIDDEN ||status === TILE_STATUSES.MARKED) {
            if(props.mine){
                setStatus(TILE_STATUSES.MINE)
                props.stepOnMine()
            }
            else{
                setStatus(TILE_STATUSES.NUMBER)
                props.clicked()
                if (props.number===0){
                    props.activateNeighbors()
                }
            }
        }
    }

    if (props.gameEnded){
        showTile()
    }
    return (
        <div
            className={classes.box}
            onClick={showTile}
            onContextMenu={markTile}
        >
            {status === TILE_STATUSES.HIDDEN ? <div className={classes.hidden}>click</div> : null}
            {status === TILE_STATUSES.MARKED ? <div className={classes.marked}>marked</div> : null}
            {status === TILE_STATUSES.MINE ? <div className={classes.mine}>mine</div> : null}
            {status === TILE_STATUSES.NUMBER ? <div className={classes.number}>{props.number}</div> : null}
        </div>
    )
}

export default Box;



