import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { getAllPolicies } from '../api';
import { IPolicyContext, Policy } from '../types';

const PolicyContext = React.createContext<IPolicyContext>({
  policies: [],
  refetch: () => { },
  error: null,
  loading: false
});

export const PolicyContextProvider = ({ children }: PropsWithChildren) => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllPolicies();
      setPolicies(response);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <PolicyContext.Provider value={{ policies, refetch, error, loading }}>
      {children}
    </PolicyContext.Provider>
  );
}

export const usePolicyContext = () => {
  const { policies, error, loading, refetch } = useContext(PolicyContext);
  return { policies, error, loading, refetch }
}

export default usePolicyContext;
