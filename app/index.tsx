import React, {createContext, useState} from 'react';
import {TouristNavigator, UserNavigator} from './navigators';
import {View} from 'react-native';

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
      {renderNavigators()}
    </navigatorsContext.Provider>
  );
};

export default ChatClientRN;
