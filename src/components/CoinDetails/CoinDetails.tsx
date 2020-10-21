import React from 'react';
import './CoinDetails.sass';

interface CoinDetailsParams {
  coinId: number;
}
const CoinDetails: React.FC<CoinDetailsParams> = (params) => {
  const {coinId} = params;
  return <div className='coin-details'>
    Coin Details
    coinId: {coinId}
  </div>;
};

export default CoinDetails;
