import EasyWords from "./EasyWords";
import MediumWords from "./MediumWords";
import HardWords from "./HardWords";

export type GameLevel = "easy" | "medium" | "hard";
export type GameStatus = "playing" | "paused" | "over";
export interface OysterWord {
  word: string;
  meaning: string;
}

export default class Oyster {
  private wordList: OysterWord[] = [];

  private playerName: string = "";
  private playerScore: number = 0;

  private SCORE_INCREMENT = 10;
  private currentWord: OysterWord = { word: "", meaning: "" };
  private originalWord: string = localStorage.getItem("oyster.Current") || "";

  constructor(level: GameLevel = "easy", name: string = "Player") {
    switch (level) {
      case "easy":
        this.wordList = EasyWords;
        break;
      case "medium":
        this.wordList = MediumWords;
        break;
      case "hard":
        this.wordList = HardWords;
        break;
      default:
        this.wordList = EasyWords;
    }
    this.playerName = name;
    this.playerScore = 0;
  }

  private increaseScore() {
    this.playerScore += this.SCORE_INCREMENT;
  }

  private loadWord() {
    const randomIndex = Math.floor(Math.random() * this.wordList.length);
    this.currentWord = this.wordList[randomIndex];
    localStorage.setItem("oyster.Current", this.currentWord.word);
    this.originalWord = this.currentWord.word;
  }

  private randomizeWord() {
    const wordArray = this.currentWord.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
  }

  public play() {
    this.loadWord();
    this.originalWord = this.currentWord.word;
    return {
      word: this.randomizeWord(),
      meaning: this.currentWord.meaning,
    };
  }

  public checkAnswer(answer: string): boolean {
    console.log({ answer, word: this.originalWord });
    if (answer === this.originalWord) {
      this.increaseScore();
      return true;
    }
    return false;
  }

  public getCurrentGameScore() {
    return {
      playerName: this.playerName,
      score: this.playerScore,
    };
  }

  public loadNext() {
    this.loadWord();
    this.originalWord = this.currentWord.word;
    localStorage.setItem("oyster.Current", this.currentWord.word);
    return {
      word: this.randomizeWord(),
      meaning: this.currentWord.meaning,
    };
  }
}
