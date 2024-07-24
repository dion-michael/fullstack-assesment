import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@mui/material';
import './App.css';
import { usePolicyContext } from './hooks/usePolicyContext';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import usePolicyForm from './hooks/usePolicyForm';
import DeletionDialog from './components/DeletionDialog';
import { useState } from 'react';
import { Policy } from './types';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function App() {
  const { policies, refetch, loading } = usePolicyContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<Policy | undefined>(undefined);

  const closeDeleteDialog = () => {
    setPolicyToDelete(undefined);
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = (policy: Policy) => {
    setPolicyToDelete(policy);
    setDeleteDialogOpen(true);
  }

  const { openForm } = usePolicyForm()

  const columns = [
    { field: 'name', headerName: 'Policy Name', width: 150 },
    { field: 'type', headerName: 'Policy Type', width: 150 },
    {
      field: 'coverage',
      headerName: 'Coverage',
      width: 150,
      align: 'right',
      headerAlign: 'right'
    },
    {
      field: 'premium',
      headerName: 'Premium',
      width: 150,
      align: 'right',
      headerAlign: 'right'
    }
  ];

  return (
    <>
      <AppBar>
        <Toolbar>
          <Container>
            <Typography variant="h6">
              Insurance Policy Management Dashboard
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 1 }}>
        <Toolbar />
        <TableContainer component={Paper} variant="outlined">
          <Toolbar>
            <Typography component={'div'} variant="h6" sx={{ flexGrow: 1 }}>
              Insurance Policies List
            </Typography>
            <ButtonGroup size="small">
              <LoadingButton onClick={refetch} loading={loading} startIcon={<Refresh />}>
                refetch
              </LoadingButton>
              <Button onClick={() => openForm()} startIcon={<Add />}>
                add policy
              </Button>
            </ButtonGroup>
          </Toolbar>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    width={column.width}
                    align={column.align as any}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.map((row: any) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align as any}
                      width={column.width}
                    >
                      {Number(row[column.field]) ? USDollar.format(row[column.field]) : row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton onClick={() => openForm(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => openDeleteDialog(row)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <LinearProgress />}
        </TableContainer>
        <DeletionDialog onClose={closeDeleteDialog} open={deleteDialogOpen} policy={policyToDelete} />
      </Container>
    </>
  );
}

export default App;
