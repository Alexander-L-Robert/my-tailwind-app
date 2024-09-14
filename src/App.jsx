import { useReducer } from "react";
import SelectionForm from "./SelectionForm";
import choicesData from "./choices.json";
import "./App.css";

/* TODOs
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
    case "CALCULATE_WINNER": {
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
      //increase the number of choices in the game
      const round = wins + losses + ties;
      if (round >= choicesIncrement.length) return state;

      const currentIndex = choices.length - initialState.choices.length;
      const incrementValue = choicesIncrement[round];

      // Ensure that the number of new items to add does not exceed the length of allItems
      const newItems = allChoices.slice(
        currentIndex,
        currentIndex + incrementValue
      );
      choices = choices.concat(newItems);
      console.log(choices.length);
      console.log(choices);
      return { ...state, choices };
    }
    case "UPDATE_TITLE": {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const titleLength = 3;
      let title = "";
      for (let i = 0; i < titleLength; i++) {
        title += choices[(randomIndex + i) % choices.length];
        title += i == titleLength - 1 ? "!" : " ";
      }
      document.title = title;
      return { ...state, title };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const playRound = (userChoice) => {
    dispatch({ type: "CALCULATE_WINNER", choice: userChoice });
    dispatch({ type: "INCREMENT" });
    dispatch({ type: "UPDATE_TITLE" });
  };

  return (
    <>
      <h1 style={{ fontSize: "50px" }}>{state.title}</h1>
      <SelectionForm choices={state.choices} onSubmit={playRound} />
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
