import { useState } from "react";
import "./App.css";
import Oyster, { GameStatus, OysterWord } from "./game/Oyster";
import OysterButton from "./components/OysterButton";
import OysterDescription from "./components/OysterDescription";
import { Modal } from "antd";

function App() {
  const [state, setState] = useState<OysterWord>();
  const [score, setScore] = useState<number>(0);
  const [gameSatus, setGameStatus] = useState<GameStatus>();
  const [savedText, setSavedText] = useState("");

  const showGameOverModal = () => {
    Modal.error({
      title: "Game Over",
      content: "Invalid selection",
    });
  };

  const handleClick = (key: string) => {
    if (savedText.length < Number(state?.word.length)) {
      setSavedText(savedText + key); // Append "A"
    }
  };

  const oyster = new Oyster();
  const playGame = () => {
    const { word, meaning } = oyster.play();
    setState({ word, meaning });
  };

  const loadNext = () => {
    // compare the answer and save the score
    setSavedText("");
    const isCorrectAnswer = oyster.checkAnswer(savedText);
    console.log({ isCorrectAnswer });
    if (!isCorrectAnswer) {
      setGameStatus("over");
      showGameOverModal();
    } else {
      const { score: currentScore } = oyster.getCurrentGameScore();
      setScore(currentScore);
      const { word, meaning } = oyster.loadNext();
      setState({ word, meaning });
    }
  };

  return (
    <div
      className="px-8  flex justify-center flex-col items-center py-12 h-screen   g-origin-border bg-cover bg-blend-multiply bg-gray-200"
      id="app"
    >
      <h1 className="text-3xl font-bold  mb-4  bayon-regular ">
        Unscramble the word
      </h1>
      {state ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center">
            {state.word.split("").map((letter, index) => (
              <span onClick={() => handleClick(letter)} key={index}>
                <OysterButton key={index} letter={letter} />
              </span>
            ))}
          </div>
          <OysterDescription description={state.meaning} />

          <div className="flex flex-col items-center mt-8">
            <button
              onClick={loadNext}
              className="bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>

          <span>Answer: {savedText}</span>
          <span>Score: {score}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={playGame}
            className="bg-violet-500 text-white px-4 py-2 rounded-md"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
