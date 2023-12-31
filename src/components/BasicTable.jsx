import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable({ inputData }) {
  // Check if inputData is undefined, empty, or the first element is undefined
  if (!inputData || inputData.length === 0 || !inputData[0]) {
    console.error('inputData is undefined or empty');
    return null;
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
                <StyledTableCell key={i} align={i === 0 ? 'left' : 'right'}>
                  {key}
                </StyledTableCell>
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
              <TableCell align="right">{row['Price ($)']}</TableCell>
              <TableCell align="right">
                {row['Failure rate (1/year)']}
              </TableCell>
              <TableCell align="right">{row.Description}</TableCell>
              <TableCell align="right">{row.Parent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
