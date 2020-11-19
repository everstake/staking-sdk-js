import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import App from './pages/App/App';
import Providers from './contexts/Providers';
import emitter from './utils/Emitter';
import {Config, UserCoin} from './models/config.model';

declare const window: any;

export default class StakingSDK {
  private handlers: any = {};
  constructor(private config: Config) {
    const {id} = config;
    const targetElement = document.getElementById(id);
    if (!targetElement) {
      throw Error(`DOM Element with id '${id}' not found!`);
    }
    ReactDOM.render(
      <React.StrictMode>
        <Providers>
          <App config={config} handlers={this.handlers}/>
        </Providers>
      </React.StrictMode>,
      targetElement
    );
  }

  on(event: 'stake' | 'unstake' | 'claim', listener: (...args: any[]) => void) {
    return emitter.on(event, listener);
  }

  open(coins: UserCoin[]) {
    const handler = this.handlers.onOpen;
    if (typeof handler === 'function') {
      handler(coins);
    }
  }

  close() {
    const handler = this.handlers.onClose;
    if (typeof handler === 'function') {
      handler();
    }
  }
}

// const staking = new StakingSDK({id: 'staking-sdk'});
// const initCoins = [
//   {
//     symbol: 'XTZ',
//     address: 'tz1LLNkQK4UQV6QcFShiXJ2vT2ELw449MzAA',
//     balance: '0.256'
//   },
//   {
//     symbol: 'atom',
//     address: 'cosmos1gdmscydnyl0pj6lcjzmeuhr6g5g68u97z3jm8l',
//     balance: '24.5803'
//   }
// ];
// staking.on('stake', data => {
//   console.log('stake data', data);
// });
//
// staking.on('unstake', data => {
//   console.log('unstake data', data);
// });
//
// staking.on('claim', data => {
//   console.log('claim data', data);
// });
//
// setTimeout(() => {
//   staking.open(initCoins);
// }, 0);

window.StakingSDK = StakingSDK;
