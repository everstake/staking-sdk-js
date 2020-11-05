import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import StakingSdk from './pages/StakingSdk/StakingSdk';
import Providers from './contexts/Providers';
import {WalletConfig} from './contexts/StateProvider';
import emitter from './utils/Emitter';

declare const window: any;

export class WalletSdk {
  handlers: any = {};
  constructor(public config: WalletConfig) {
    ReactDOM.render(
      <React.StrictMode>
        <Providers>
          <StakingSdk handlers={this.handlers}/>
        </Providers>
      </React.StrictMode>,
      document.getElementById(config.elemId)
    );
  }

  on(event: string, listener: (...args: any[]) => void) {
    return emitter.on(event, listener);
  }

  open() {
    const handler = this.handlers.onOpen;
    if (typeof handler === 'function') {
      handler(this.config);
    }
  }
}

window.WalletSdk = WalletSdk;
