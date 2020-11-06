import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Validator} from '../models/validators.model';
import useCoin from '../hooks/useCoin';


export interface ValidatorsContextI {
  coinValidators: Validator[];
  selectCoinValidator: (validatorId: string) => boolean;
  selectedCoinValidator: Validator | undefined;
}

const initialValue: ValidatorsContextI = {
  coinValidators: [],
  selectCoinValidator: () => false,
  selectedCoinValidator: undefined
};

export const ValidatorsContext = createContext<ValidatorsContextI>(initialValue);

const ValidatorsProvider: React.FC = ({children}) => {
  const [coinValidators, setCoinValidators] = useState<Validator[]>(initialValue.coinValidators);
  const [selectedCoinValidators, setSelectedCoinValidators] = useState<{[coinId: string]: Validator}>({});
  const {selectedCoin} = useCoin();

  const fetchValidators = useCallback(() => {
    if (selectedCoin) {
      const validatorsEntity = selectedCoin.validators.map(validator => new Validator(validator));
      setCoinValidators(validatorsEntity);
      if (!selectedCoinValidators[selectedCoin.id]) {
        setDefaultCoinValidator(validatorsEntity);
      }
    }
  }, [selectedCoin]);

  useEffect(() => {
    setCoinValidators([]);
    fetchValidators();
  }, [selectedCoin]);

  const setDefaultCoinValidator = (validators: Validator[]) => {
    const defaultValidator = validators.find(validator => validator.isDefault) || validators[0];
    if (!defaultValidator || !selectedCoin) {
      return;
    }
    setSelectedCoinValidators(prevState => {
      const coinValidatorsMap = {...prevState};
      coinValidatorsMap[selectedCoin.id] = defaultValidator;
      return coinValidatorsMap;
    });
  };

  const selectCoinValidator = (validatorId: string): boolean => {
    const findValidator = coinValidators.find(validator => validator.id === validatorId);
    if (!findValidator || !selectedCoin) {
      return false;
    }
    setSelectedCoinValidators(prevState => {
      const coinValidatorsMap = {...prevState};
      coinValidatorsMap[selectedCoin.id] = findValidator;
      return coinValidatorsMap;
    });
    return true;
  };

  const selectedCoinValidator = (): Validator | undefined => {
    if (!selectedCoin) {
      return;
    }
    return selectedCoinValidators[selectedCoin.id];
  };

  return <ValidatorsContext.Provider value={{
    coinValidators,
    selectedCoinValidator: selectedCoinValidator(),
    selectCoinValidator
  }}>
    {children}
  </ValidatorsContext.Provider>;
};

export default ValidatorsProvider;
