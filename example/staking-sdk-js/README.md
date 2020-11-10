#Staking SDK

*A simple library to add everstake functionality to your wallet.*

## Features

- Simple API and integration in any web wallet

## Installation

### Import in your project

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

// You may initialize a StakingSDK with only one line of javascript code:
const everstake = new StakingSDK({id: 'staking-sdk'});

// To open the popup, use the 'open' method with an array of StakingUserCoin type:
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
  coinId: string;
  amount: string;
  validatorName: string;
  validatorAddress: string;
  type: Event;
}


type Event = 'stake' | 'unstake' | 'claim';
````
