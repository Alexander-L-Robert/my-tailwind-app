import { useReducer } from "react";
import SelectionForm from "./SelectionForm";
import choicesData from "./choices.json";
import "./App.css";

/* TODOs
title updates to be a 3 contiguous items at a random index each play
  larger title centered at top
add cycle graph and rules
  cycle graph: directed cycle of nodes with arrows
    hovering prints name and image of the node
    clicking nodes on cycle graph shows which one would win
      select button to select an already selected cycle graph node as choice to play
  rules:
    collapsable pharagraph on the win condition
layout:
  2 columns:
  col1: 
    choices: fills up a wider column on the left
  col2:
    children: cycle graph, rules, shoot button, & scoreboard a column on the right
      col2 is anchored to scrollbar
  */
const allChoices = choicesData.choices;
const choicesIncrement = [2, 4, 6, 8, 8, 10, 20, 40];

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
  // copying state to maintain immutability in reducers
  let { result, wins, losses, ties } = state;
  let choices = state.choices.slice();

  switch (action.type) {
    case "PLAY": {
      const userIndex = choices.indexOf(action.choice);
      const computerIndex = Math.floor(Math.random() * choices.length);
      const distanceUserToComputer =
        (computerIndex - userIndex + choices.length) % choices.length;
      const distanceComputerToUser =
        (userIndex - computerIndex + choices.length) % choices.length;

      if (
        userIndex == computerIndex ||
        distanceUserToComputer == distanceComputerToUser
      ) {
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
    case "INCREMENT": {
      const round = wins + losses + ties;
      if (round >= choicesIncrement.length) return state;

      const currentIndex = choices.length - initialState.choices.length;
      const incrementValue = choicesIncrement[round];

      // Ensure that the number of new items to add does not exceed the length of allItems
      const newItems = allChoices
        .slice(currentIndex, currentIndex + incrementValue);
      choices = choices.concat(newItems);
      console.log(choices.length)
      console.log(choices)
      return {
        ...state,
        choices,
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
    dispatch({ type: "INCREMENT", choice: userChoice });
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
