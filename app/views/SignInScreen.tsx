import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Input} from 'react-native-elements';

import {navigatorsContext, userInfoContext} from '../index';
import {IUser} from '../chat';

interface ISignInScreen {
  navigation: NavigationScreenProp<{}>;
}

const userFindGql = gql`
  query userFind($userId: String!) {
    userFind(userId: $userId) {
      avatar
      friends
      userId
    }
  }
`;

const SignInScreen: React.FC<ISignInScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  const {setUserInfo} = useContext(userInfoContext);

  let userId: string = '';
  const {refetch} = useQuery<{userFind: IUser}, {userId: string}>(userFindGql, {
    variables: {userId: userId},
  });

  return (
    /* eslint-disable react-native/no-inline-styles */
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>登录界面</Text>
      <Input
        onChangeText={name => {
          userId = name;
        }}
        placeholder={'输入姓名'}
      />
      <Button
        title="登录"
        onPress={() => {
          refetch({userId}).then(res => {
            const {userFind: userInfo} = res.data;
            console.log(res, userInfo);
            if (userInfo) {
              setUserInfo({...userInfo});
              setNavigator('UserNavigator');
            } else {
              console.warn('用户名不存在');
            }
          });
        }}
      />
    </View>
  );
};

export default SignInScreen;
