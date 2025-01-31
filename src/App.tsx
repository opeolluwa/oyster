import { useEffect, useState } from "react";
import "./App.css";
import Oyster, { OysterWord } from "./game/Oyster";
import OysterButton from "./components/OysterButton";
import OysterDescription from "./components/OysterDescription";
import { Modal } from "antd";
import { Radio } from "antd";

import type { CheckboxGroupProps } from "antd/es/checkbox";

const gameOptions: CheckboxGroupProps<string>["options"] = [
  { label: "Easy", value: "easy" },
  { label: "medium", value: "medium" },
  { label: "hard", value: "hard" },
];

function App() {
  const [state, setState] = useState<OysterWord>();
  const [score, setScore] = useState<number>(0);
  const [savedText, setSavedText] = useState("");

  const oyster = new Oyster("easy");
  const playGame = () => {
    const { word, meaning } = oyster.play();
    setState({ word, meaning });
  };

  const scoreddd = () => {
    oyster.increaseScore();
  };
  const showGameOverModal = () => {
    Modal.error({
      title: "Oops",
      content: "Invalid selection",
    });
  };

  const handleClick = (key: string) => {
    if (savedText.length < Number(state?.word.length)) {
      setSavedText(savedText + key); // Append "A"
    }
  };

  const resetInput = () => {
    setSavedText("");
  };

  const loadNext = () => {
    // compare the answer and save the score
    resetInput();
    const isCorrectAnswer = oyster.checkAnswer(savedText);
    console.log({ isCorrectAnswer });
    if (!isCorrectAnswer) {
      showGameOverModal();
    } else {
      const { word, meaning } = oyster.loadNext();
      setState({ word, meaning });
      const { score: currentScore } = oyster.getCurrentGameScore();
      setScore(currentScore);
    }
  };

  return (
    <div
      className=" flex justify-center flex-col items-center overflow-y-hidden h-screen   g-origin-border bg-cover bg-blend-multiply bg-gray-200"
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

          <div className="flex gap-4">
            <div className="text-indigo-500">
              Answer: <span className="text-black">{savedText}</span>{" "}
            </div>
            <div className="text-green-500">
              Score: <span className="text-black">{score}</span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8">
            <div className="flex gap-x-2 ">
              <button
                onClick={loadNext}
                className="bg-violet-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
              <button
                onClick={resetInput}
                className="border-violet-500 bg-gray-300 px-4 py-2 rounded-md"
              >
                Reset input
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={playGame}
            className="bg-violet-500 mt-3 text-white px-4 py-2 rounded-md"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
