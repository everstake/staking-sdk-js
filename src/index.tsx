import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import * as serviceWorker from './serviceWorker';
import StakingSdk from './pages/StakingSdk/StakingSdk';
import Providers from './contexts/Providers';
import {WalletConfig} from './contexts/StateProvider';

declare const window: any;

export class WalletSdk {
  logTestText?: () => void;
  ref: any = React.createRef();
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

  open() {
    const handler = this.handlers.onOpen;
    if (typeof handler === 'function') {
      handler(this.config);
    }
  }

  close() {
    console.log('close');
  }
}

// ToDo: Remove initializing
const walletSdk = new WalletSdk({elemId: 'wallet-sdk'});

window.WalletSdk = WalletSdk;



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
