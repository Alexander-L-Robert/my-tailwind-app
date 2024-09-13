import { useState } from "react";
import PropTypes from "prop-types";

function SelectionForm({ options, onSubmit }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`You selected: ${selectedOption}`);
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Shoot!</button>
      {options.map((option) => {
        return (
          <div key={option}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </div>
        );
      })}
    </form>
  );
}

// Adding PropTypes validation
SelectionForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func,
};

export default SelectionForm;
