const inputVal = (input) => {
    return (input !== "") ? true : 'Value cannot be empty.  Please enter valid characters.';
}

module.exports = { inputVal };