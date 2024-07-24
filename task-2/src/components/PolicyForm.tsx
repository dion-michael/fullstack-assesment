import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Policy } from '../types';
import { Send } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPolicy, updatePolicy } from '../api';
import usePolicyContext from '../hooks/usePolicyContext';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'material-ui-snackbar-provider';

interface PolicyFormProps {
  open: boolean;
  onClose: () => any;
  editValues?: Policy;
}

const schema = yup
  .object({
    name: yup.string().required(),
    type: yup.string().required(),
    coverage: yup.number().positive().integer().required().moreThan(0),
    premium: yup.number().positive().integer().required().moreThan(0)
  })
  .required();

const PolicyForm: React.FC<PolicyFormProps> = ({ open, onClose, editValues }) => {
  const snackbar = useSnackbar();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      type: '',
      coverage: 0,
      premium: 0
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (editValues) {
      setValue('name', editValues.name)
      setValue('type', editValues.type)
      setValue('coverage', editValues.coverage)
      setValue('premium', editValues.premium)
    }
  }, [editValues, setValue]);

  const [loading, setLoading] = useState(false)
  const { refetch } = usePolicyContext()
  const onSubmit: SubmitHandler<Policy> = async (data) => {
    try {
      setLoading(true)
      editValues ? await updatePolicy(editValues.id as string, data) : await createPolicy(data);
      snackbar.showMessage('added successfully!')
      refetch();
      reset();
      onClose();
    } catch (error: any) {
      snackbar.showMessage(error?.message || 'error when creating policy')
    } finally {
      setLoading(false)
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create new Insurance Policy</DialogTitle>
        <Box sx={{ px: 4, py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...(field as any)}
                    label="policy name"
                    error={errors.name}
                    fullWidth
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...(field as any)}
                    label="policy type"
                    fullWidth
                    error={errors.type}
                    helperText={errors.type?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="coverage"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    {...(field as any)}
                    label="coverage amount"
                    fullWidth
                    error={errors.coverage}
                    helperText={errors.coverage?.message}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="premium"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    {...(field as any)}
                    label="premium amount"
                    fullWidth
                    error={errors.premium}
                    helperText={errors.premium?.message}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <LoadingButton type="submit" endIcon={<Send />} loading={loading}>
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PolicyForm;
