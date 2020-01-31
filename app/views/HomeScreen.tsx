/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

interface IHomeScreen {
  navigation: NavigationScreenProp<{}>;
}

const HomeScreen: React.FC<IHomeScreen> = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
