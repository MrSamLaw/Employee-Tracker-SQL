const inputVal = (input) => {
    return (input !== "") ? true : 'Value cannot be empty.  Please enter valid characters.';
}

const numVal = (input) => {
    return (isNaN(input) === false) ? true : 'Please enter a numerical id.';
}

module.exports = { inputVal, numVal };