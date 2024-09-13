import { useState, useReducer, useEffect } from "react";
import SelectionForm from "./SelectionForm";
import ChoiceImages from "./ChoiceImage";
import choicesData from "./choices.json";
import "./App.css";

/*
instead of an actual graph, index (i) will beat (i + 1)
  with the edge case being the last item in the list loops back to the first item
    so the win condition is the shorter directed distance between the choices
start with default init state
  gradually add choices after each round
  */
const initialState = {
  title: "Rock Paper Scissors!",
  choices: ["Paper", "Rock", "Scissors"],
  winGraph: {
    //key beats value
    Rock: "Scissors",
    Paper: "Rock",
    Scissors: "Paper",
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
      } else {
        //(winGraph[computerChoice] === userChoice)
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
  const choices = choicesData.choices;

  const outcome = (userChoice) => {
    dispatch({ type: "PLAY", choice: userChoice });
  };

  return (
    <>
      <h1>{state.title}</h1>
      <SelectionForm choices={state.choices} onSubmit={outcome} />
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
