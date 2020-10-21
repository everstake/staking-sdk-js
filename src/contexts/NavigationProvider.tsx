import React, {createContext, useState} from 'react';
import CoinsList from '../components/CoinsList/CoinsList';
import CoinDetails from '../components/CoinDetails/CoinDetails';
import Stake from '../components/Stake/Stake';
import Unstake from '../components/Unstake/Unstake';

interface RouteI {
  path: PATH;
  component: React.ComponentType | React.ClassType<any, any, any>;
  params?: unknown;
}

interface NavigationContextI {
  route: RouteI;
  navigations: RouteI[];
  tree: RouteI[];
  navigate?: (path: PATH, params?: any) => boolean;
  goBack?: () => boolean;
}

export enum PATH {
  COINS_LIST = 'coins-list',
  COIN_DETAILS = 'coin-details',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

const navigations: RouteI[] = [
  {
    path: PATH.COINS_LIST,
    component: CoinsList
  },
  {
    path: PATH.COIN_DETAILS,
    component: CoinDetails
  },
  {
    path: PATH.STAKE,
    component: Stake
  },
  {
    path: PATH.UNSTAKE,
    component: Unstake
  },
];

const initialValue: NavigationContextI = {
  route: navigations[0],
  navigations,
  tree: [navigations[0]]
};

export const NavigationContext = createContext<NavigationContextI>(initialValue);

const NavigationProvider: React.FC = ({children}) => {
  const [route, setRoute] = useState<RouteI>(initialValue.route);
  const [tree, setTree] = useState<RouteI[]>(initialValue.tree);

  const navigate = (path: PATH, params?: any, changeTree = true): boolean => {
    const newRoute: RouteI | undefined = navigations.find(nav => nav.path === path);
    if (!newRoute || path === route.path) {
      return false;
    }
    newRoute.params = params;
    setRoute(newRoute);
    if (changeTree) {
      setTree(prevTree => {
        return [...prevTree, newRoute];
      });
    }
    return true;
  };

  const goBack = (): boolean => {
    if (tree.length < 2) {
      return false;
    }
    let isNavigation = false;
    setTree(prevTree => {
      const newTree = [...prevTree];
      newTree.pop();
      const lastRouteIndex = newTree.length - 1;
      const lastRoute = newTree[lastRouteIndex];
      if (lastRoute) {
        isNavigation = navigate(lastRoute.path, lastRoute.params, false);
      }
      return newTree;
    });
    return isNavigation;
  };

  return <NavigationContext.Provider value={{route, tree, navigations, navigate, goBack}}>
    {children}
  </NavigationContext.Provider>;
};

export default NavigationProvider;
