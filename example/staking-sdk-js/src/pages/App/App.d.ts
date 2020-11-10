import React from 'react';
import './App.sass';
import { Config, UserCoin } from '../../models/config.model';
export interface StakingSdkProps {
    handlers: {
        onOpen: ((coins: UserCoin[]) => void) | undefined;
        onClose: (() => void) | undefined;
    };
    config: Config;
}
declare const App: React.FC<StakingSdkProps>;
export default App;
