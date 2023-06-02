import classes from './EndGame.module.css'

function EndGame({ state, exitModal }) {

    return (
        <form className={classes.form}>
            <p>
                <label htmlFor="EndingGame">you {state}!</label>
            </p>
            <p className={classes.actions}>
                <button type='button' onClick={exitModal}>Cancel</button>
            </p>
        </form>
    )

}

export default EndGame;