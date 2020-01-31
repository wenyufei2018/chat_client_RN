/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {navigatorsContext} from '../index';

interface ITouristScreen {
  navigation: NavigationScreenProp<{}>;
}

const TouristScreen: React.FC<ITouristScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>游客页面</Text>
      <Button
        title="转到用户页面"
        onPress={() => setNavigator('UserNavigator')}
      />
    </View>
  );
};

export default TouristScreen;
