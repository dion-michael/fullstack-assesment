export interface Policy {
  id?: string;
  name: string;
  type: string;
  coverage: number;
  premium: number;
}

export interface PolicyUpdateData {
  name?: string;
  type?: string;
  coverage?: number;
  premium?: number;
}

export interface IPolicyContext {
  policies: Policy[];
  refetch: () => any;
  error: any;
  loading: boolean;
}
