import { useState } from "react";
import PropTypes from "prop-types";
import ChoiceImage from "./ChoiceImage";

function SelectionForm({ choices, onSubmit }) {
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`You selected: ${selectedChoice}`);
    if (selectedChoice) {
      onSubmit(selectedChoice);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={!selectedChoice}
        style={{ margin: "10px", padding: "5px", outlineStyle: "solid" }}
      >
        Shoot!
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "10px",
        }}
      >
        {choices.map((choice) => {
          return (
            <div
              key={choice}
              onClick={() => handleChoiceChange(choice)}
              style={{
                border:
                  selectedChoice === choice
                    ? "3px solid blue"
                    : "1px solid gray",
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <ChoiceImage choice={choice} />
            </div>
          );
        })}
      </div>
    </form>
  );
}

// Adding PropTypes validation
SelectionForm.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func,
};

export default SelectionForm;
