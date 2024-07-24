import React, { PropsWithChildren, useContext, useState } from 'react';
import { Policy } from '../types';
import PolicyForm from '../components/PolicyForm';

interface IPolicyFormContext {
  openForm: (values?: Policy) => any;
  closeForm: () => any;
  open: boolean;

}

const PolicyFormContext = React.createContext<IPolicyFormContext>({
  openForm: () => { },
  closeForm: () => { },
  open: false
});

export const PolicyFormProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [editValues, setEditValues] = useState<Policy | undefined>(undefined);

  const openForm = (values?: Policy) => {
    setEditValues(values)
    setOpen(true);
  };
  const closeForm = () => {
    setEditValues(undefined)
    setOpen(false);
  };

  return (
    <PolicyFormContext.Provider value={{ open, openForm, closeForm }}>
      {children}
      <PolicyForm open={open} onClose={closeForm} editValues={editValues} />
    </PolicyFormContext.Provider>
  );
}

export const usePolicyForm = () => {
  return useContext(PolicyFormContext);
}

export default usePolicyForm;
