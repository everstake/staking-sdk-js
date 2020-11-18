import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Validator} from '../models/validators.model';
import useCoin from '../hooks/useCoin';


export interface ValidatorsContextI {
  coinValidators: Validator[];
  selectCoinValidators: (validatorIds: string[]) => boolean;
  selectedCoinValidators: Validator[];
}

const initialValue: ValidatorsContextI = {
  coinValidators: [],
  selectCoinValidators: () => false,
  selectedCoinValidators: []
};

export const ValidatorsContext = createContext<ValidatorsContextI>(initialValue);

const ValidatorsProvider: React.FC = ({children}) => {
  const [coinValidators, setCoinValidators] = useState<Validator[]>(initialValue.coinValidators);
  const [selectedValidatorsForCoins, setSelectedValidatorsForCoins] = useState<{[coinId: string]: Validator[]}>({});
  const {selectedCoin} = useCoin();

  const fetchValidators = useCallback(() => {
    if (selectedCoin) {
      const validatorsEntity = selectedCoin.validators.map(validator => new Validator(validator));
      setCoinValidators(validatorsEntity);
      if (!selectedValidatorsForCoins[selectedCoin.id]) {
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
    setSelectedValidatorsForCoins(prevState => {
      const coinValidatorsMap = {...prevState};
      coinValidatorsMap[selectedCoin.id] = [defaultValidator];
      return coinValidatorsMap;
    });
  };

  const selectCoinValidators = (validatorIds: string[]): boolean => {
    const findValidators: Validator[] = coinValidators.filter(validator => validatorIds.find(validatorId => validatorId === validator.id));
    if (!selectedCoin) {
      return false;
    }
    setSelectedValidatorsForCoins(prevState => {
      const coinValidatorsMap = {...prevState};
      coinValidatorsMap[selectedCoin.id] = findValidators;
      return coinValidatorsMap;
    });
    return true;
  };

  const selectedCoinValidators = (): Validator[] => {
    if (!selectedCoin) {
      return [];
    }
    return selectedValidatorsForCoins[selectedCoin.id] || [];
  };

  return <ValidatorsContext.Provider value={{
    coinValidators,
    selectedCoinValidators: selectedCoinValidators(),
    selectCoinValidators
  }}>
    {children}
  </ValidatorsContext.Provider>;
};

export default ValidatorsProvider;
