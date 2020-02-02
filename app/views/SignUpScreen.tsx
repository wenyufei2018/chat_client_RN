/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {navigatorsContext, userInfoContext} from '../index';
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks'
import {Input, Button} from 'react-native-elements';

interface ISignUpScreen {
  navigation: NavigationScreenProp<{}>;
}

const ShowUserGql = gql`
    query{
        users{
            name
        }
    }
`;

const AddUserGql = gql`
    mutation AddUser($input: addUserInput){
        addUser(input:$input){
            name
        }
    }
`;

const SignUpScreen: React.FC<ISignUpScreen> = () => {
  const {setNavigator} = useContext(navigatorsContext);
  const {setUserInfo} = useContext(userInfoContext);
  
  const [addUser, { loading: addUserLoading }] = useMutation(AddUserGql);
  
  const {loading: ShowUserLoading, error, data} = useQuery(ShowUserGql);
  if(!ShowUserLoading) console.log(data);
  if(!!error) {
    console.warn(error);
  }
  
  let Name: string;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>注册页面</Text>
      <Input
        onChangeText={(name) => {
          console.log((name));
          Name = name;
        }}
        placeholder={'输入姓名'}
      />
      <Button
        title='添加用户'
        onPress={()=>{
          for(const item of data.users){
            console.log(item, Name);
            if(item.name === Name) {
              console.warn('有相同的姓名');
              return;
            }
          }
          addUser({
            variables: {input:{name: Name}},
            refetchQueries: [{ query: ShowUserGql }]
          }).then((res) => {
            console.log(res.data.addUser);
          });
          setNavigator('UserNavigator');
          setUserInfo({name: Name});
        }}
      />
    </View>
  );
};

export default SignUpScreen;
