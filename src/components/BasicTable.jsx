import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({ inputData }) {

  if (!inputData || inputData.length === 0 || !inputData[0]) {
    console.error('inputData is undefined or empty');
    return null; // or you can return a message or a placeholder component
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              // map over the keys of the first object in the array
              Object.keys(inputData[0]).map((key, i) => (
                // create a table cell for each key
                <TableCell key={i} align="right">
                  {key}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {inputData.map((row) => (
            <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Type}</TableCell>
              <TableCell align="right">{row.Quantity}</TableCell>
              <TableCell align="right">{row["Price ($)"]}</TableCell>
              <TableCell align="right">{row["Failure rate (1/year)"]}</TableCell>
              <TableCell align="right">{row.Description}</TableCell>
              <TableCell align="right">{row.Parent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
