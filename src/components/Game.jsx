import { useState, useRef, useContext } from 'react';
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import ReactDOM from 'react-dom'
import styles from './Game.module.css'
import { QuizContext } from '../context/country';

const Game = () => {
    const button = useRef([]);
    const { options, createRandom, point, setPoint, setStart, gameOver, setGameOver, buttonVisibility, setButtonVisibility } = useContext(QuizContext);
    const [answerCorrect, setAnswerCorrect] = useState(null);
    const [answerWrong, setAnswerWrong] = useState(null);
    const [next, setNext] = useState(false);

    function viewAnswer(value) {
        setNext(true);
        if (value === options.answer) {
            console.log('correct');
            button.current.forEach(item => {
                if (item.dataset.id === value) {
                    item.classList.add(styles.success);
                    setAnswerCorrect(value);
                    setPoint(point + 1);
                }
                item.disabled = true;

            })
        } else {
            button.current.forEach(item => {
                if (item.dataset.id === value) {
                    item.classList.add(styles.wrong);
                    setAnswerWrong(value);
                }

                if (item.dataset.id === options.answer) {
                    item.classList.add(styles.success);
                    setAnswerCorrect(options.answer);
                    setGameOver(true);
                }
                item.disabled = true;

            })
        }
    }

    function nextStep() {
        setNext(false);
        if (gameOver) {
            setStart(false);

        } else {
            createRandom();
        }
    }


    return (
        <div className={styles.game}>
            <div className={styles.header_game}>
                {
                    options.flag && (
                        <img src={options.flag} alt={options.question} />
                    )
                }
                <h3>{options.question}</h3>
            </div>

            <div className={styles.answers}>
                {
                    options.options.map((option, index) => (
                        <button key={option}
                            ref={el => button.current[index] = el}
                            data-id={option}
                            className={styles.btn_answers}
                            onClick={
                                () => {
                                    viewAnswer(option);
                                }
                            }>
                            {option}

                            {
                                answerCorrect === options.answer && (
                                    <IoIosCheckmarkCircleOutline className={styles.iconSuccess} />
                                )
                            }
                            {
                                answerWrong === option && (
                                    <IoIosCloseCircleOutline className={styles.iconWrong} />
                                )
                            }
                        </button>
                    ))
                }
            </div>
            {next && <button className={styles.next} onClick={nextStep}>next</button>}


        </div>
    )
}
export default Game;