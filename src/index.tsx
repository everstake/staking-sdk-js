import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import * as serviceWorker from './serviceWorker';
import StakingSdk from './components/StakingSdk/StakingSdk';
import Providers from './contexts/Providers';

declare const window: any;

export class WalletSdk {
  logTestText?: () => void;
  constructor(id: string) {
    ReactDOM.render(
      <React.StrictMode>
        <Providers>
          <StakingSdk/>
        </Providers>
      </React.StrictMode>,
      document.getElementById(id)
    );
  }

  open() {
    console.log('open');
  }

  close() {
    console.log('close');
  }
}

window.WalletSdk = WalletSdk;

const wallet = new WalletSdk('wallet-sdk');
console.log('wallet', wallet);
// setTimeout(() => wallet.open(), 5000);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
