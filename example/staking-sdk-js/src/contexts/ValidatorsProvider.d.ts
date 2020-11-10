import React from 'react';
import { Validator } from '../models/validators.model';
export interface ValidatorsContextI {
    coinValidators: Validator[];
    selectCoinValidator: (validatorId: string) => boolean;
    selectedCoinValidator: Validator | undefined;
}
export declare const ValidatorsContext: React.Context<ValidatorsContextI>;
declare const ValidatorsProvider: React.FC;
export default ValidatorsProvider;
