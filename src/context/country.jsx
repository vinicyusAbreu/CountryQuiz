import { useState, useEffect, createContext } from "react";
import { questions } from "../Api/api";
import shuffle from "../utils/Shuffle";

export const QuizContext = createContext({});

function QuizProvider({ children }) {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({});
    const [point, setPoint] = useState(0);
    const [start, setStart] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const createRandom = () => {
        let random = shuffle(data);
        let option_1 = random.next().value;
        let option_2 = random.next().value;
        let option_3 = random.next().value;
        let option_4 = random.next().value;

        let optionsQuiz = shuffle([option_1, option_2, option_3, option_4]);

        let randomTitle = shuffle([0, 1]);

        if (randomTitle.next().value === 0) {

            let quiz = {
                question: `${option_1.capital} is the capital of`,
                flag: null,
                options: [optionsQuiz.next().value['name'], optionsQuiz.next().value['name'], optionsQuiz.next().value['name'], optionsQuiz.next().value['name']],
                answer: option_1.name,
            }
            setOptions(quiz);



        } else {


            let quiz = {
                question: `Which country does this flag belong to?`,
                flag: option_1.flag,
                options: [optionsQuiz.next().value['name'], optionsQuiz.next().value['name'], optionsQuiz.next().value['name'], optionsQuiz.next().value['name']],
                answer: option_1.name,
            }
            setOptions(quiz);



        }


    }


    useEffect(() => {

        let timer = setTimeout(() => {
            questions("/all?fields=name,capital,flag", setData);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <QuizContext.Provider value={{ options, createRandom, point, setPoint, start, setStart, gameOver, setGameOver }}>
            {children}
        </QuizContext.Provider>
    )
}


export default QuizProvider;