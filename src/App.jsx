import { useState, useContext } from 'react';
import { QuizContext } from './context/country';
import styles from './App.module.css';
import Quiz from './layout/Quiz';



const App = () => {
  const [start, setStart] = useState(false);

  const { createRandom } = useContext(QuizContext);

  function startGame() {
    createRandom();
    setStart(true);
  }

  return (
    <div className={styles.app_container}>
      <h1 className={styles.h1}>Country quiz</h1>

      {
        start ?
          <Quiz />
          : <button className={styles.button}
            onClick={startGame}
          >START</button>
      }

    </div>

  )
}

export default App
