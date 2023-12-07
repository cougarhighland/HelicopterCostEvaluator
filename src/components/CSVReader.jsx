import { useState } from 'react';
import Papa from 'papaparse';
import { Grid, Input, InputLabel } from '@mui/material';

const fileExtensions = ['csv'];

const CSVReader = ({ onReceivedData }) => {
  // State to store error messages
  const [error, setError] = useState('');

  // Event handler for file input change
  const changeHandler = (event) => {
    // Clear any existing errors
    setError('');

    // Check the file extension
    const ext = event.target.files[0].type.split('/')[1];

    // Array of allowed file extensions (assuming it's defined somewhere in your code)
    const fileExtensions = ['csv'];

    // Check if the file extension is not in the allowed list
    if (!fileExtensions.includes(ext)) {
      // Display an error message and stop further processing
      debugger; // For debugging purposes
      setError('Please input a CSV file');
      return;
    }

    // Use Papa.parse to parse the CSV file
    Papa.parse(event.target.files[0], {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
      complete: function (results) {
        // Callback function when parsing is complete, pass the parsed data to onReceivedData
        onReceivedData(results.data);
      },
    });
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <InputLabel htmlFor="csvInput">Enter CSV file</InputLabel>
        <Input
          type="file"
          name="file"
          accept=".csv"
          style={{ margin: '10px auto' }}
          onChange={changeHandler}
          id="csvInput"
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: '3rem' }}>{error}</div>
      </Grid>
    </Grid>
  );
};

export default CSVReader;
