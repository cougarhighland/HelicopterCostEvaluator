import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import formatData from '../utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function SpecificTable({ inputData }) {
  // Check if inputData is undefined, empty, or the first element is undefined
  if (!inputData || inputData.length === 0 || !inputData[0]) {
    console.error('inputData is undefined or empty');
    return null;
  }
  const rows = formatData(inputData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              // map over the keys of the first object in the array
              inputData[0].map((categories, index) => (
                // create a table cell for each key
                <StyledTableCell
                  key={index}
                  align={index === 0 ? 'left' : 'right'}
                >
                  {categories}
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.col1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.col1}
              </TableCell>
              <TableCell align="right">{row.col2}</TableCell>
              <TableCell align="right">{row.col3}</TableCell>
              <TableCell align="right">{row.col4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
