import { useState } from 'react';
import Papa from 'papaparse';
import { Grid, Input, InputLabel } from '@mui/material';


const fileExtensions = ['csv'];

const CSVReader = ({onReceivedData}) => {
  //State to store error
  const [error, setError] = useState('');

  const changeHandler = (e) => {
    //Checking file
    setError('');
    //Check file extension
    const ext = event.target.files[0].type.split('/')[1];
    if (!fileExtensions.includes(ext)) {
      debugger;
      setError('Please input a csv file');
      return;
    }

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
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
      <div style={{ marginTop: '3rem' }}>
        {error}
      </div>
    </Grid>
  </Grid>
  );
};

export default CSVReader;
