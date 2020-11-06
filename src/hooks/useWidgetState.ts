import {useContext} from 'react';
import {StateContext, StateContextI} from '../contexts/StateProvider';

const useWidgetState = () => {
  return useContext<StateContextI>(StateContext);
};

export default useWidgetState;
