import React, {createContext, useState} from 'react';
import CoinList from '../pages/CoinList/CoinList';
import CoinDetails from '../pages/CoinDetails/CoinDetails';
import Stake from '../pages/Stake/Stake';
import Unstake from '../pages/Unstake/Unstake';

interface RouteI {
  path: PATH;
  component: React.ComponentType | React.ClassType<any, any, any>;
  params?: { [key: string]: any };
}

interface NavigationContextI {
  route: RouteI;
  navigations: RouteI[];
  tree: RouteI[];
  navigate: (path: PATH, params?: { [key: string]: any }) => boolean;
  goBack: () => boolean;
}

export enum PATH {
  COIN_LIST = 'coin-list',
  COIN_DETAILS = 'coin-details',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

const navigations: RouteI[] = [
  {
    path: PATH.COIN_LIST,
    component: CoinList
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

// ToDo: Return default router
// const rootRoute: RouteI = {...navigations[0]};
const rootRoute: RouteI = {...navigations[0], params: {coinId: '0'}};

const initialValue: NavigationContextI = {
  route: rootRoute,
  navigations,
  tree: [rootRoute],
  navigate: () => false,
  goBack: () => false
};

export const NavigationContext = createContext<NavigationContextI>(initialValue);

const NavigationProvider: React.FC = ({children}) => {
  const [route, setRoute] = useState<RouteI>(initialValue.route);
  const [tree, setTree] = useState<RouteI[]>(initialValue.tree);

  const navigate = (path: PATH, params?: { [key: string]: any }, changeTree = true): boolean => {
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
