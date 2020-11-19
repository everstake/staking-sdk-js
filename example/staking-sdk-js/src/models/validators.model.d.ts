export interface ValidatorDto {
    readonly id: string;
    readonly name: string;
    readonly address: string;
    readonly fee: string;
    readonly isReliable: boolean;
    readonly amount?: string;
}
export declare class Validator {
    id: string;
    name: string;
    address: string;
    fee: string;
    isReliable: boolean;
    amount?: string;
    isDefault: boolean;
    constructor(validator: ValidatorDto);
}
