import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Policy } from '../types';
import { deletePolicy } from '../api';
import usePolicyContext from '../hooks/usePolicyContext';
import { useSnackbar } from 'material-ui-snackbar-provider';

interface DeletionDialogProps {
  policy?: Policy;
  open: boolean;
  onClose: () => any;
}

const DeletionDialog: React.FC<DeletionDialogProps> = ({ policy, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const { refetch } = usePolicyContext()
  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await deletePolicy(policy?.id as string);
      snackbar.showMessage('deleted successfully');
      refetch();
      onClose();
    } catch (error: any) {
      snackbar.showMessage(error?.message || 'error when deleting the policy');
    } finally {
      setLoading(false);
    }
  }, [policy, onClose, refetch, snackbar]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>Are you sure you want to delete policy <b>{`${policy?.name}`}</b>?</DialogContent>
      <DialogActions>
        <Button color={'inherit'} onClick={onClose}>Cancel</Button>
        <LoadingButton loading={loading} onClick={handleDelete} endIcon={<Delete />}>Delete</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeletionDialog