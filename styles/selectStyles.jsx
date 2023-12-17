// Define custom styles for React Select
const selectStyles = {
  container: (provided) => ({
    ...provided,
    width: "300px", // Adjust the width of the select container as needed
    zIndex: 0,
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid black" : "1px solid #ccc", // Change the border color when the select is focused or not
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 255, 0.3)" : "none", // Add a box shadow when the select is focused
    "&:hover": {
      borderColor: state.isFocused ? "black" : "#ccc", // Change the border color on hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f5f5f5", // Change the background color of the dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "black" : "white", // Change the background color of selected and non-selected options
    color: state.isSelected ? "white" : "black", // Change the text color of selected and non-selected options
    fontSize: "12px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black", // Change the color of the selected value text
    fontSize: "12px", // Adjust the font size of the selected value text
  }),
};

export default selectStyles;
