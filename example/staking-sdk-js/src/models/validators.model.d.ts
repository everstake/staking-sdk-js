export interface ValidatorDto {
    readonly id: string;
    readonly name: string;
    readonly fee: string;
    readonly isReliable: boolean;
    readonly address: string;
}
export declare class Validator {
    id: string;
    name: string;
    fee: string;
    isReliable: boolean;
    address: string;
    isDefault: boolean;
    constructor(validator: ValidatorDto);
}
