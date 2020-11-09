#StakingSdk

*A simple library to add everstake functionality to your wallet.*

## Features

- Simple API
- Simple integration into any web wallet

## Installation

### Import in your project

ES6 and newer

```javascript
import {StakingSdk} from 'staking-sdk-js';
```

ES5

```javascript
const StakingSdk = require('staking-sdk-js');
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

// You may initialize a StakingSdk with only one line of javascript code:
const stakingSdk = new StakingSdk({id: 'staking-sdk'});

// To open the interface, use the 'open' method with an array of UserCoin type:
stakingSdk.open([
  {
    symbol: 'XTZ',
    address: 'Tezos user address',
    balance: '1'
  }
]);

// To subscribe to events use the 'on' method:
stakingSdk.on('stake', stakeData => {
  // your code
})
````

### Interfaces

````typescript
interface StakingSdkConfig {
    id: string;
    theme?: Theme;
}

interface StakingSdkTheme {
    colorPrimary: string;
    colorPrimaryDark: string;
    colorAccent: string;
    windowBackground: string;
    detailsHeaderBg: string;
    focusColor: string;
    colorGreen: string;
    warningColor: string;
}

interface StakingSdkUserCoin {
    symbol: string;
    address: string;
    balance: string;
}

type StakingSdkEvent = 'stake' | 'unstake' | 'claim';
````
