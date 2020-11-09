import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import App from './pages/App/App';
import Providers from './contexts/Providers';
import emitter from './utils/Emitter';
import {StakingSdkConfig, StakingSdkEvent, StakingSdkUserCoin} from './models/config.model';

declare const window: any;

export class StakingSdk {
  private handlers: any = {};
  constructor(public config: StakingSdkConfig) {
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

  on(event: StakingSdkEvent, listener: (...args: any[]) => void) {
    return emitter.on(event, listener);
  }

  open(coins: StakingSdkUserCoin[]) {
    const handler = this.handlers.onOpen;
    if (typeof handler === 'function') {
      handler(coins);
    }
  }
}

const staking = new StakingSdk({id: 'staking-sdk'});
const c = [
  {
    symbol: 'XTZ',
    address: 'Tezos user address',
    balance: '0.256'
  },
  {
    symbol: 'ICX',
    address: 'ICON user address',
    balance: '24.5803'
  }
];

setTimeout(() => {
  staking.open(c);
}, 100);

window.StakingSdk = StakingSdk;
