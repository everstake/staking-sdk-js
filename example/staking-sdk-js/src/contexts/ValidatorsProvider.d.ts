import React from 'react';
import { Validator } from '../models/validators.model';
export interface ValidatorsContextI {
    coinValidators: Validator[];
    selectCoinValidators: (validatorIds: string[]) => boolean;
    selectedCoinValidators: Validator[];
}
export declare const ValidatorsContext: React.Context<ValidatorsContextI>;
declare const ValidatorsProvider: React.FC;
export default ValidatorsProvider;
