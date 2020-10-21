import {useContext} from 'react';
import {NavigationContext} from '../contexts/NavigationProvider';

const useNavigation = () => {
  return useContext(NavigationContext);
};

export default useNavigation;
