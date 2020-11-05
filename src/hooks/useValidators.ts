import {useContext} from 'react';
import {ValidatorsContext, ValidatorsContextI} from '../contexts/ValidatorsProvider';

const useValidators = () => {
  return useContext<ValidatorsContextI>(ValidatorsContext);
};

export default useValidators;
