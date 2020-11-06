import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import App from './pages/App/App';
import Providers from './contexts/Providers';
import emitter from './utils/Emitter';
import {StakingSdkConfig} from './models/config.model';

declare const window: any;

export class StakingSdk {
  handlers: any = {};
  constructor(public config: StakingSdkConfig) {
    ReactDOM.render(
      <React.StrictMode>
        <Providers>
          <App handlers={this.handlers}/>
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

window.StakingSdk = StakingSdk;
