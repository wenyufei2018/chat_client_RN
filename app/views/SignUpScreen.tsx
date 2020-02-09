import React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {Input, Button} from 'react-native-elements';

import {IUser} from '../chat';

interface ISignUpScreen {
  navigation: NavigationScreenProp<{}>;
}

const AddUserGql = gql`
  mutation AddUser($userId: String!) {
    addUser(userId: $userId) {
      status
    }
  }
`;

const allUserGql = gql`
  query {
    allUser {
      friends
      userId
      avatar
    }
  }
`;

const SignUpScreen: React.FC<ISignUpScreen> = () => {
  const [addUser] = useMutation<{addUser: {status: string}}, {userId: string}>(
    AddUserGql,
  );
  const {refetch} = useQuery<{allUser: IUser[]}>(allUserGql);
  let userId: string = '';

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>注册页面</Text>
      <Input
        onChangeText={name => {
          console.log(name);
          userId = name;
        }}
        placeholder={'输入姓名'}
      />
      <Button
        title="添加用户"
        onPress={() => {
          if (!userId) {
            return;
          }
          refetch().then(res => {
            const {allUser} = res.data;
            for (const item of allUser) {
              if (userId === item.userId) {
                console.warn('用户已经存在')
                return;
              }
            }
            addUser({
              variables: {userId},
            })
              .then((res) => {
                console.warn(res.data?.addUser.status);
              })
              .catch(e => {
                console.error(e);
              });
          });
        }}
      />
    </View>
  );
};

export default SignUpScreen;
