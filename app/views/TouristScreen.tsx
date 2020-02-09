/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

interface ITouristScreen {
  navigation: NavigationStackProp<{}>;
}

const TouristScreen: React.FC<ITouristScreen> = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>游客页面</Text>
      <Button
        title="转到登录界面"
        onPress={() => {
          props.navigation.push('SignIn');
        }}
      />
      <Button
        title="转到注册界面"
        onPress={() => {
          props.navigation.push('SignUp');
        }}
      />
    </View>
  );
};

export default TouristScreen;
