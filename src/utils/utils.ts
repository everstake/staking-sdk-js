import {ValidatorDto} from '../models/validators.model';
import Big from 'big.js';
import {DEFAULT_APP_PRECISION} from '../models/utils';

export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : '';
};

export const validatorsToText = (validators: ValidatorDto[]): string => {
  return validators.map(validator => validator.name).join(', ');
};

export const formatAmount = (amount: number | string, symbol: string, precision: number = DEFAULT_APP_PRECISION): string => {
  return Big(amount).round(precision).toFixed() + ' ' + symbol;
};
