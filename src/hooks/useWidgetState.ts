import {useContext} from 'react';
import {StateContext} from '../contexts/StateProvider';

const useWidgetState = () => {
  return useContext(StateContext);
};

export default useWidgetState;
