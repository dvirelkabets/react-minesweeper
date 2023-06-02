import classes from './MainHeader.module.css'

function MainHeader(props) {
    return (
        <header className={classes.header}>
        <h1 className={classes.label}>
            Mine Sweeper
            </h1>
        <button className={classes.button} onClick={props.click}>new game</button>
        </header>
    )
}

export default MainHeader;