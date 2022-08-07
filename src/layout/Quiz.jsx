import { useContext } from 'react';
import { QuizContext } from '../context/country';
import styles from './Quiz.module.css';
import Game from '../components/Game';
import Result from '../components/Result';
const Quiz = () => {
    const { start } = useContext(QuizContext);
    return (
        <div className={styles.quiz_container}>
            {
                start ? <Game /> : <Result />
            }
        </div>
    )
}

export default Quiz;