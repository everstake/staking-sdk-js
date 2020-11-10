/// <reference types="node" />
import 'focus-visible/dist/focus-visible.min';
import './index.sass';
import { Config, UserCoin } from './models/config.model';
export default class StakingSDK {
    private config;
    private handlers;
    constructor(config: Config);
    on(event: 'stake' | 'unstake' | 'claim', listener: (...args: any[]) => void): import("events").EventEmitter;
    open(coins: UserCoin[]): void;
    close(): void;
}
