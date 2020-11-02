import {useContext} from 'react';
import {ValidatorsContext} from '../contexts/ValidatorsProvider';

const useValidators = () => {
  return useContext(ValidatorsContext);
};

export default useValidators;
