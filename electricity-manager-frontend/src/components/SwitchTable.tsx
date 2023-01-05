import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { SwitchPoint } from '../types';

interface SwitchTableProps {
  data: SwitchPoint[];
  stageEdit: (id: string) => void;
  stageDelete: (id: string) => void;
}

function SwitchTable({ data, stageEdit, stageDelete }: SwitchTableProps) {
  return (
    <TableContainer component={Box} data-testid="switch-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 12, fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell sx={{ fontSize: 12, fontWeight: 'bold' }} align="right">
              High limit
            </TableCell>
            <TableCell sx={{ fontSize: 12, fontWeight: 'bold' }} align="right">
              Active
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.highLimit}</TableCell>
              <TableCell align="right">
                {row.isActive ? (
                  <Chip label="ON" color="success" size="small" />
                ) : (
                  <Chip label="OFF" color="error" size="small" />
                )}
              </TableCell>
              <TableCell sx={{ maxWidth: 10 }}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="edit"
                    id="edit"
                    onClick={() => stageEdit(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ maxWidth: 10 }}>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    aria-label="delete"
                    id="delete"
                    onClick={() => stageDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SwitchTable;
