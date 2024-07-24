import axios from 'axios';
import { Policy, PolicyUpdateData } from './types';

const policyApi = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getAllPolicies = async () => {
  const { data } = await policyApi.get('/policies');
  return data as Policy[];
};

export const getPolicyById = async (id: string) => {
  const { data } = await policyApi.get(`/policies/${id}`);
  return data as Policy;
};

export const createPolicy = async (policy: Policy) => {
  const { data } = await policyApi.post('/policies', policy);
  return data as Policy;
};

export const updatePolicy = async (
  id: string,
  updateData: PolicyUpdateData
) => {
  const { data } = await policyApi.put(`/policies/${id}`, updateData);
  return data as Policy;
};

export const deletePolicy = async (id: string) => {
  const { data } = await policyApi.delete(`/policies/${id}`);
  return data as Policy;
};

export default policyApi;
