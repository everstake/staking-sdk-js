export interface ValidatorDto {
  readonly id: string;
  readonly name: string;
  readonly fee: string;
  readonly isReliable: boolean;
  readonly address: string;
}

export class Validator {
  id: string;
  name: string;
  fee: string;
  isReliable: boolean;
  address: string;
  isDefault: boolean;
  constructor(validator: ValidatorDto) {
    this.id = validator.id;
    this.name = validator.name;
    this.fee = validator.fee;
    this.isReliable = validator.isReliable;
    this.address = validator.address;
    this.isDefault = validator.name.includes('Everstake');
  }
}
