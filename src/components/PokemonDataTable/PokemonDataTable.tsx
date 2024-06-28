import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Props {
  columnDefinitions: {
    headerName: string;
    field: string;
    isKeyField?: boolean;
    css?: any;
  }[];
  rowData: any[];
  onRowClick?: Function;
}

/**
 * A table component that encapsulates the styling common to the tables in the
 * app, including zebra striping and hover effect. Allows the client to specify
 * the column definitions, row data and an optional onRowClick handler
 *
 * @param columnDefinitions The column definitions for the table
 * @param rowData The row data for the table
 * @param {Function} onRowClick Optional row click handler
 *
 * @returns {JSX.Element}
 */
const PokemonDataTable = ({
  columnDefinitions,
  rowData,
  onRowClick
}: Props) => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:nth-of-type(odd): hover, &:nth-of-type(even):hover': {
      backgroundColor: 'lightgrey'
    }
  }));

  const keyField = columnDefinitions.find(
    (columnDef) => columnDef.isKeyField
  )?.field;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'rgb(173, 205, 247)' }}>
            {columnDefinitions.map((columnDef) => (
              <TableCell
                key={columnDef.field}
                sx={{
                  fontWeight: 'bold',
                  borderBottom: 'none',
                  fontSize: '1em',
                  textTransform: 'capitalize'
                }}
              >
                {columnDef.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <StyledTableRow
              key={row[keyField as string]}
              hover
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: onRowClick ? 'pointer' : 'inherit'
              }}
              onClick={() => onRowClick?.(row)}
            >
              {columnDefinitions.map((columnDef) => (
                <TableCell
                  key={columnDef.field}
                  sx={{
                    ...columnDef.css,
                    fontWeight: 'bold',
                    borderBottom: 'none',
                    fontSize: '1em'
                  }}
                >
                  {row[columnDef.field]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonDataTable;
