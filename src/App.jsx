import { useState, useReducer, useEffect } from "react";
import SelectionForm from "./SelectionForm";
import choicesData from "./choices.json";
import "./App.css";

/* 
TODO: Pull from API images
format data with: label, image
generate winGraph making a single cycle of label comparisons
*/
const initialState = {
  choices: ["🪨", "📜", "✂️"],
  winGraph: {
    "🪨": "✂️", // Rock beats Scissors
    "📜": "🪨", // Paper beats Rock
    "✂️": "📜", // Scissors beats Paper
  },
  computerChoice: "",
  result: "",
  wins: 0,
  losses: 0,
  ties: 0,
};

function gameReducer(state, action) {
  // coping state to maintain immutability in reducers
  let { result, wins, losses, ties } = state;
  let choices = state.choices.slice();
  let winGraph = { ...state.winGraph };

  switch (action.type) {
    case "PLAY": {
      const userChoice = action.choice;
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      if (userChoice === computerChoice) {
        result = "Tie!";
        ties++;
      } else if (winGraph[userChoice] === computerChoice) {
        result = "You win!";
        wins++;
      } else { //(winGraph[computerChoice] === userChoice)
        result = "You lose!";
        losses++;
      }

      return {
        ...state,
        computerChoice: computerChoice,
        result,
        wins,
        losses,
        ties,
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const outcome = (userChoice) => {
    dispatch({ type: "PLAY", choice: userChoice });
  };
  let title = "Rock Paper Scissors!";
  return (
    <>
      <h1>{title}</h1>
      <SelectionForm options={state.choices} onSubmit={outcome} />
      <>
        <h2>Result: {state.result}</h2>
        <p>Computers choice: {state.computerChoice}</p>
        <p>
          Wins: {state.wins} | Losses: {state.losses} | Ties: {state.ties}
        </p>
      </>
    </>
  );
}

export default App;
