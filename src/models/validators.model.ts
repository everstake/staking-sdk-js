export interface ValidatorDto {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly fee: string;
  readonly isReliable: boolean;
  readonly amount?: string;
}

export class Validator {
  id: string;
  name: string;
  address: string;
  fee: string;
  isReliable: boolean;
  amount?: string;
  isDefault: boolean;
  constructor(validator: ValidatorDto) {
    this.id = validator.id;
    this.name = validator.name;
    this.address = validator.address;
    this.fee = validator.fee;
    this.isReliable = validator.isReliable;
    if (validator.amount) {
      this.amount = validator.amount;
    }
    this.isDefault = validator.name.includes('Everstake');
  }
}
