/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {userInfoContext} from '../index';

const DetailsScreen = () => {
  const {userInfo} = useContext(userInfoContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>{userInfo && userInfo.name}</Text>
    </View>
  );
};

export default DetailsScreen;
