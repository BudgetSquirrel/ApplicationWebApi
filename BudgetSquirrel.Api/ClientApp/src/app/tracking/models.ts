export interface Fund {
  id: string;
  name: string;

  subFunds: Fund[];
}