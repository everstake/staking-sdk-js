# Staking SDK

*A simple library to add Everstake support to your wallet.*

## Features

- Simple API and integration for any web wallet

## Example

See sample usage in `example` directory.

## Installation

### Import library into your project

ES6 and newer

```javascript
import StakingSDK from 'staking-sdk-js';
```

ES5

```javascript
const StakingSDK = require('staking-sdk-js');
```

### Markup

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
    <div id="staking-sdk"></div>
  </body>
</html>
````

### Usage

````javascript

// Initialize SDK
const everstake = new StakingSDK({id: 'staking-sdk'});

// To open the popup, use the 'open' method with an array of UserCoin type:
everstake.open([
  {
    symbol: 'XTZ',
    address: 'tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM',
    balance: '0.8'
  }
]);

// To subscribe to events use the 'on' method:
everstake.on('stake', stakeData => {
  // your code
});

// To close popup
everstake.close();
````

### Interfaces

````typescript
interface Config {
    id: string;
    theme?: Theme;
}

interface Theme {
    colorPrimary: string;
    colorPrimaryDark: string;
    colorAccent: string;
    windowBackground: string;
    detailsHeaderBg: string;
    focusColor: string;
    colorGreen: string;
    warningColor: string;
}

interface UserCoin {
    symbol: string;
    address: string;
    balance: string;
}

interface EventData {
  symbol: string;
  amount: string;
  validatorName: string;
  validatorAddress: string;
  type: Event;
}

type Event = 'stake' | 'unstake' | 'claim';
````
