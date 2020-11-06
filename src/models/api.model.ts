export interface StakeParams {
  address: string;
  validatorId: string;
  amount: string;
}

export interface NewTransactionModel {
  readonly [key: string]: string;
}

export interface ClaimParams {
  address: string;
}

export interface UnstakeParams {
  address: string;
  amount: string;
}
