/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {navigatorsContext, userInfoContext} from '../index';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import {Input} from 'react-native-elements';

interface ISignInScreen {
  navigation: NavigationScreenProp<{}>;
}

const ShowUserGql = gql`
    query{
        users{
            name
        }
    }
`;

const SignInScreen: React.FC<ISignInScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  const {setUserInfo} = useContext(userInfoContext);
  
  const {loading: ShowUserLoading, error, data} = useQuery(ShowUserGql);
  if(!ShowUserLoading) console.log(data);
  if(!!error) {
    console.warn(error);
  }
  
  let Name: string;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>登录界面</Text>
      <Input
        onChangeText={(name) => {
          console.log((name));
          Name = name;
        }}
        placeholder={'输入姓名'}
      />
      <Button
        title="登录"
        onPress={() => {
          for(const item of data.users){
            console.log(item, Name);
            if(item.name === Name) {
              setUserInfo({name: Name});
              setNavigator('UserNavigator');
              return;
            }
          }
          console.warn('没有注册');
        }}
      />
    </View>
  );
};

export default SignInScreen;
