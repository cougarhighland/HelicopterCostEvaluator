const formatData = (inputData) => {
  // Initialize an array to store rows of data
  const rows = [];

  // Iterate through the elements at index 1 of inputData (assuming inputData[0] is headers)
  for (let i = 0; i < inputData[1].length; i++) {
    // Create an object for each row with corresponding column values
    rows.push({
      col1: inputData[1][i],
      col2: inputData[2][i],
      col3: inputData[3][i],
      col4: inputData[4][i],
    });
  }
  return rows;
};

export default formatData;
