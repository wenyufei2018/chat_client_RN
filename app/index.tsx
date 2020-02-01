import React, {createContext, useState} from 'react';
import {TouristNavigator, UserNavigator} from './navigators';
import {View} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import {apolloUrl} from './configs';
import fetch from "node-fetch";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

type INavigatorsItem = 'TouristNavigator' | 'UserNavigator';

interface INavigatorsContext {
  navigator: INavigatorsItem;
  setNavigator: (navigator: INavigatorsItem) => void;
}

export const navigatorsContext = createContext<INavigatorsContext>({
  navigator: 'TouristNavigator',
  setNavigator: () => {},
});

const ChatClientRN: React.FC = () => {
  const [navigator, setNavigator] = useState<INavigatorsItem>(
    'TouristNavigator',
  );
  
  const cache = new InMemoryCache({
    addTypename: false
  });
  
  const client = new ApolloClient({
    ssrMode: false,//__SERVER__ ? true : false,
    // @ts-ignore
    link: new HttpLink({
      uri: apolloUrl,
      fetch
    }),
    cache
  });

  const renderNavigators = () => {
    switch (navigator) {
      case 'TouristNavigator':
        return <TouristNavigator />;
      case 'UserNavigator':
        return <UserNavigator />;
      default:
        return <View />;
    }
  };

  return (
    <navigatorsContext.Provider value={{navigator, setNavigator}}>
      <ApolloProvider client={client}>
        {renderNavigators()}
      </ApolloProvider>
    </navigatorsContext.Provider>
  );
};

export default ChatClientRN;
