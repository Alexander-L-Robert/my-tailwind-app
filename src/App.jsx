import { useReducer } from "react";
import SelectionForm from "./SelectionForm";
import choicesData from "./choices.json";
import "./App.css";

/*
start with default init state
  gradually add choices after each round
  */
const initialState = {
  title: "Rock Paper Scissors!",
  choices: ["Paper", "Rock", "Scissors"],
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

  switch (action.type) {
    case "PLAY": {
      const userIndex = choices.indexOf(action.choice);
      const computerIndex = Math.floor(Math.random() * choices.length)
      const distanceUserToComputer = (computerIndex - userIndex + choices.length) % choices.length;
      const distanceComputerToUser = (userIndex - computerIndex + choices.length) % choices.length;

      if (userIndex == computerIndex || distanceUserToComputer == distanceComputerToUser) { 
        //ensure odd sized list of choices to avoid equidistant ties
        result = "Tie!";
        ties++;
      } else if (distanceUserToComputer < distanceComputerToUser) {
        result = "You win!";
        wins++;
      } else {
        result = "You lose!";
        losses++;
      }

      return {
        ...state,
        computerChoice: choices[computerIndex],
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
  const allChoices = choicesData.choices;
  console.log(allChoices)

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
