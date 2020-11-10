import React from 'react';
interface RouteI {
    path: PATH;
    component: React.ComponentType | React.ClassType<any, any, any>;
    params?: {
        [key: string]: any;
    };
}
export interface NavigationContextI {
    route: RouteI;
    navigations: RouteI[];
    tree: RouteI[];
    navigate: (path: PATH, params?: {
        [key: string]: any;
    }) => boolean;
    goBack: () => boolean;
    reset: () => void;
}
export declare enum PATH {
    COIN_LIST = "coin-list",
    COIN_DETAILS = "coin-details",
    STAKE = "stake",
    CALCULATOR = "calculator",
    UNSTAKE = "unstake"
}
export declare const NavigationContext: React.Context<NavigationContextI>;
declare const NavigationProvider: React.FC;
export default NavigationProvider;
