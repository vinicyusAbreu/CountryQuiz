import { useContext } from 'react';
import styles from './Result.module.css';
import winner from '../assets/result.svg';
import { QuizContext } from '../context/country';


const Result = () => {
    const { createRandom, setStart, point, setPoint, setGameOver } = useContext(QuizContext);

    function startGame() {
        setPoint(0);
        createRandom();
        setGameOver(false);
        setStart(true);
    }

    return (
        <div className={styles.result}>
            <img src={winner} alt="resultado" />
            <h2>Results</h2>
            <p>You got <span>{point}</span> correct answers</p>

            <button onClick={startGame}>Try again</button>
        </div>
    )
}
export default Result;