/// <reference types="react" />
import { ValidatorDto } from '../models/validators.model';
export declare const hexToRgb: (hex: string) => string;
export declare const validatorsToText: (validators: ValidatorDto[]) => string;
export declare const formatAmount: (amount: import("react").Key, symbol: string, precision?: number) => string;
