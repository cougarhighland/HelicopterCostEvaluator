import { useState } from 'react';
import CSVReader from '../components/CSVReader';
import { Typography, Box } from '@mui/material';
import SpecificTable from '../components/SpecificTable';
import BasicTable from '../components/BasicTable';
import BarLineChart from '../components/BarLineChart';
import CombiningChart from '../components/CombiningChart';

const Home = () => {
  // Define state to hold received data from CSVReader component
  const [receivedData, setReceivedData] = useState([]);

  // Define constant array for column names
  const COL_NAME = [
    'Name',
    'Total Price ($)',
    'Annual Failure Cost ($)',
    'MTBF (year(s))',
  ];

  // Function to handle CSV data received from CSVReader component
  const handleCSVData = (data) => {
    // Process the data received from the CSVReader component
    setReceivedData(data);
  };

  // Function to extract product names and failure rates from received data
  const extractColumn = () => {
    let productName = [];
    let failureRate = [];

    receivedData.map((item) => {
      productName.push(item.Name);
      failureRate.push(item['Failure rate (1/year)']);
    });

    return { productName, failureRate };
  };

  // Function to calculate the sum of total prices for all parts
  const sumOfAllParts = () => {
    let sum = 0;
    let totalPrice = [];

    receivedData.forEach((part) => {
      const cal = part.Quantity * part['Price ($)'].replace(/\$|,/g, '');
      sum += cal;
      cal == 0 ? totalPrice.push(0) : totalPrice.push(cal);
    });

    return { sum, totalPrice };
  };

  // Function to calculate the total failure cost for all parts
  const failureCost = () => {
    let sum = 0;
    let failureCostList = [];

    for (const part of receivedData) {
      if (
        part['Failure rate (1/year)'] !== null &&
        typeof part['Failure rate (1/year)'] !== 'undefined' &&
        part['Failure rate (1/year)'] !== ''
      ) {
        const cal =
          parseFloat(part['Failure rate (1/year)']) *
          part['Price ($)'].replace(/\$|,/g, '') *
          part.Quantity;
        sum += cal;
        failureCostList.push(cal);
      } else {
        failureCostList.push(0);
      }
    }

    return { sum, failureCostList };
  };

  // Function to calculate Mean Time Between Failures (MTBF) for each part
  const calculateMTBF = () => {
    const failureRateList = extractColumn().failureRate;
    const MTBFList = [];

    failureRateList.map((item) => {
      // Check if item is not undefined or an empty string before pushing to MTBFList
      item !== undefined && item !== ''
        ? MTBFList.push(Number((1 / item).toFixed(3)))
        : MTBFList.push(0);
    });

    return MTBFList;
  };

  return (
    <>
      <Typography variant="h1" align="center">
        Home
      </Typography>
      <CSVReader onReceivedData={handleCSVData} />
      {receivedData && receivedData.length > 0 && (
        <>
          <Typography fontSize="xl4" variant="h3" sx={{ mb: 1 }} align="left">
            Overview
          </Typography>
          <BasicTable inputData={receivedData} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <Typography
              fontSize="xl4"
              variant="h3"
              sx={{ mt: 3, mb: 1 }}
              align="left"
            >
              Analyse Table
            </Typography>
            <SpecificTable
              inputData={[
                COL_NAME,
                extractColumn().productName,
                sumOfAllParts().totalPrice,
                failureCost().failureCostList,
                calculateMTBF(),
              ]}
            />
            <Typography fontSize="xl4" variant="h5" sx={{ mt: 1 }} align="left">
              Total Cost: ${sumOfAllParts().sum}
            </Typography>
            <Typography fontSize="xl4" variant="h5" sx={{ mt: 1 }} align="left">
              Total of Annual Failure Cost: ${failureCost().sum}
            </Typography>
            <Typography
              fontSize="xl4"
              variant="h3"
              sx={{ mt: 1, mb: 1 }}
              align="left"
            >
              Charts
            </Typography>
            <BarLineChart
              dataset={[
                COL_NAME,
                extractColumn().productName,
                sumOfAllParts().totalPrice,
                failureCost().failureCostList,
                calculateMTBF(),
              ]}
            />
            <CombiningChart
              dataSet={[
                COL_NAME,
                extractColumn().productName,
                sumOfAllParts().totalPrice,
                failureCost().failureCostList,
                calculateMTBF(),
              ]}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default Home;
