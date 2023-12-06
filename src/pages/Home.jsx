import { useState } from 'react';
import CSVReader from '../components/CSVReader';
import { Typography, Box } from '@mui/material';
import BasicTable from '../components/BasicTable';

const Home = () => {
  const [receivedData, setReceivedData] = useState([]);
  const handleCSVData = (data) => {
    // Process the data received from the CSVReader component
    setReceivedData(data);
  };

  const sumOfAllParts = () => {
    let sum = 0;
    receivedData.forEach((part) => {
      sum += part.Quantity * part['Price ($)'].replace(/\$|,/g, '');
    });

    return sum;
  };

  const sumFailureRate = () => {
    let sum = 0;
    let validDataCount = 0;
  
    for (const part of receivedData) {
      if (part["Failure rate (1/year)"] !== null && typeof part["Failure rate (1/year)"] !== 'undefined' && part["Failure rate (1/year)"] !== '') {
        sum += parseFloat(part["Failure rate (1/year)"]);
        validDataCount++;
      }
    }
  
    if (validDataCount === 0) {
      // Handle the case where there is no valid data
      return 0;
    }

    return sum / validDataCount;
  };

  const calculateCostPerYear = () => {
    const sum = sumOfAllParts();
    const failureRate = sumFailureRate();
    return sum / (1 / failureRate); 
  }

  const calculateMTBF = () => {
    const failureRate = sumFailureRate();
    return 1 / failureRate; 
  }

  return (
    <div>
      <Typography variant="h1" align="center">
        Home
      </Typography>
      <CSVReader onReceivedData={handleCSVData} />
      <BasicTable inputData={receivedData} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100vh' }}>
      <Typography fontSize="xl4" variant='h5'  sx={{ mt: 1 }} align="left">
      Total Product BreakDown Cost: ${sumOfAllParts()}
      </Typography>
      <Typography fontSize="xl4" variant='h5'  sx={{ mt: 1 }} align="left">
      Total Failure Rate of Product BreakDown: {sumFailureRate()}
      </Typography>
      <Typography fontSize="xl4" variant='h5'  sx={{ mt: 1 }} align="left">
      Mean Time Between Failures (MTBF): {calculateMTBF()} year(s)
      </Typography>
      <Typography fontSize="xl4" variant='h5'  sx={{ mt: 1 }} align="left">
      Cost per year: ${calculateCostPerYear()}
      </Typography>
      </Box>

    </div>
  );
};
export default Home;
