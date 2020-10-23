import React from 'react';
import './StakingSdk.sass';
import useNavigation from '../../hooks/useNavigation';
import useWidgetState from '../../hooks/useWidgetState';

export interface StakingSdkProps {
  handlers: {
    onOpen: (() => void) | undefined;
  };
}

const StakingSdk: React.FC<StakingSdkProps> = (props) => {
  const {isOpen, openWidget} = useWidgetState();
  const {route} = useNavigation();
  props.handlers.onOpen = () => {
    if (openWidget) {
      openWidget();
    }
  };

  return isOpen ? <div className='staking-sdk'>
    {route.component(route.params)}
  </div> : null;
};

export default StakingSdk;
