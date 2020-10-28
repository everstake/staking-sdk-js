import React, {MouseEvent} from 'react';
import './StakingSdk.sass';
import useNavigation from '../../hooks/useNavigation';
import useWidgetState from '../../hooks/useWidgetState';
import {WalletConfig} from '../../contexts/StateProvider';

export interface StakingSdkProps {
  handlers: {
    onOpen: ((config: WalletConfig) => void) | undefined;
  };
}

const StakingSdk: React.FC<StakingSdkProps> = (props) => {
  const {isOpen, openWidget, closeWidget} = useWidgetState();
  const {route} = useNavigation();

  props.handlers.onOpen = (config: WalletConfig) => {
    openWidget(config);
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return isOpen ? <div className='staking-sdk__backdrop' onClick={closeWidget}>
    <div className='staking-sdk' onClick={handleCardClick}>
      {route.component(route.params)}
    </div>
  </div> : null;
};

export default StakingSdk;
