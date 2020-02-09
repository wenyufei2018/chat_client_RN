import React, {createContext, useState} from 'react';
import {View} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloProvider} from '@apollo/react-hooks';
import {OperationDefinitionNode} from 'graphql';

import {apolloUrl} from './configs';
import {TouristNavigator, UserNavigator} from './navigators';
import {IUser} from './chat';
const createClient = () => {
  const httpLink = new HttpLink({
    uri: apolloUrl,
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
    },
  });

  const terminatingLink = split(
    ({query: {definitions}}) =>
      definitions.some(node => {
        const {kind, operation} = node as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      }),
    wsLink,
    httpLink,
  );

  const link = ApolloLink.from([terminatingLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return client;
};

type INavigatorsItem = 'TouristNavigator' | 'UserNavigator';

interface INavigatorsContext {
  navigator: INavigatorsItem;
  setNavigator: (navigator: INavigatorsItem) => void;
}

export const navigatorsContext = createContext<INavigatorsContext>({
  navigator: 'TouristNavigator',
  setNavigator: () => {},
});

interface IUserInfoContext {
  userInfo?: IUser;
  setUserInfo: (userInfo: IUser) => void;
}

export const userInfoContext = createContext<IUserInfoContext>({
  setUserInfo: () => {},
});

const ChatClientRN: React.FC = () => {
  const [navigator, setNavigator] = useState<INavigatorsItem>(
    'TouristNavigator',
  );

  const [userInfo, setUserInfo] = useState<IUser>({
    userId: 'default',
  });

  const client = createClient();

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
      <userInfoContext.Provider value={{userInfo, setUserInfo}}>
        <ApolloProvider client={client}>{renderNavigators()}</ApolloProvider>
      </userInfoContext.Provider>
    </navigatorsContext.Provider>
  );
};

export default ChatClientRN;
