import React from 'react';
import './StakingSdk.sass';
import useNavigation from '../../hooks/useNavigation';
import useWidgetState from '../../hooks/useWidgetState';

const StakingSdk: React.FC = () => {
  const {isOpen} = useWidgetState();
  const {route} = useNavigation();

  return isOpen ? <div className='staking-sdk'>
    {route.component(route.params)}
  </div> : null;
};

export default StakingSdk;
