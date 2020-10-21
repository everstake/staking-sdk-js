import React from 'react';
import './StakingSdk.sass';
import useNavigation from '../../hooks/useNavigation';
import { PATH } from '../../contexts/NavigationProvider';
import useWidgetState from '../../hooks/useWidgetState';

const StakingSdk: React.FC = () => {
  const {isOpen, openWidget, closeWidget} = useWidgetState();
  const {route, navigate, tree, goBack} = useNavigation();

  const nav = (path: PATH) => {
    if (navigate) {
      path === PATH.COIN_DETAILS ? navigate(path, {coinId: 5}) : navigate(path);
    }
  };

  return <div className={'staking-sdk ' + (isOpen ? '' : 'visuallyhidden')}>
    Staking Sdk
    <br/>
    <button onClick={() => goBack && goBack()}>Go back</button>
    <br/>
    <button onClick={() => nav(PATH.COINS_LIST)}>COINS_LIST</button>
    <br/>
    <button onClick={() => nav(PATH.COIN_DETAILS)}>COIN_DETAILS</button>
    <br/>
    <button onClick={() => nav(PATH.STAKE)}>STAKE</button>
    <br/>
    <button onClick={() => nav(PATH.UNSTAKE)}>UNSTAKE</button>
    <br/>
    {route.component(route.params)}
  </div>;
};

export default StakingSdk;
