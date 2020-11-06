import {useContext} from 'react';
import {NavigationContext, NavigationContextI} from '../contexts/NavigationProvider';

const useNavigation = () => {
  return useContext<NavigationContextI>(NavigationContext);
};

export default useNavigation;
