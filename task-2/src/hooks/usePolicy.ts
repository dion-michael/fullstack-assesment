import { useCallback, useEffect, useState } from 'react';
import { Policy } from '../types';
import { getPolicyById } from '../api';

const usePolicy = (id: string) => {
  const [data, setData] = useState<null | Policy>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchPolicy = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPolicyById(id);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  return { data, loading, error, fetchPolicy };
};

export default usePolicy;
