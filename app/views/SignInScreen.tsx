/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {navigatorsContext} from '../index';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import {Input} from 'react-native-elements';

interface ISignInScreen {
  navigation: NavigationScreenProp<{}>;
}

const SignInScreen: React.FC<ISignInScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  const query_allUsers = gql(`
    query{
      users{
        name
      }
    }
`);
  
  const {loading, error, data} = useQuery(query_allUsers);
  if(!loading) console.log(data);
  if(!!error) console.log(error);
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>登录界面</Text>
      <Input
        onChange={(value) => {
          console.log(value);
        }}
      />
      <Button
        title="转到用户页面"
        onPress={() => setNavigator('UserNavigator')}
      />
      <Button
        title="登录"
        onPress={() => {
          console.log("登录");
        }}
      />
    </View>
  );
};

export default SignInScreen;
