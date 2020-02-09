/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import gql from 'graphql-tag';

import {IUser} from '../chat';
import {IChatInfo, addFriendState} from './ChatListScreen';
import { useMutation } from '@apollo/react-hooks';

const addFriendGql = gql`
  mutation AddFriend($userId: String!, $friend: String!) {
    addFriend(userId: $userId, friend: $friend) {
      status
      friend {
        userId
        avatar
      }
    }
  }
`;

export interface IAddFriendProps {
  userId: string;
  chatInfo: IChatInfo;
  setChatInfo: (chatInfo: IChatInfo) => void;
}


const AddFriendScreen: React.FC<{navigation: {state:{params: IAddFriendProps}}}> = (props) => {
  const {userId, chatInfo, setChatInfo} = props.navigation.state.params;
  const [addFriend] = useMutation<{addFriend:{status: string, friend: IUser}}, {userId: string;friend: string;}>(
    addFriendGql);
  let friendStr: string = '';

  console.log('查看数据', userId, chatInfo, props.navigation.state);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AddFriend Screen</Text>
      <Input
        onChangeText={value => {
          friendStr = value;
        }}
      />
      <Button
        title='添加朋友'
        onPress = { () => {
          if(!friendStr) return;    
          addFriend({
            variables: {userId, friend: friendStr},
          })
          .then((res) => {
            if(res.data?.addFriend.status){
              const {status, friend} = res.data.addFriend;
              console.log("加粗", res)
              if(status !== 'success'){
                setChatInfo(addFriendState(chatInfo, friend));
                console.warn(`添加成功${status}`);
              }else{
                console.warn(`添加朋友失败`);
              }
            }else{
              console.warn('发生错误');
            }
          })
          .catch((err) => {
            console.warn(err);
            console.warn('发生错误');
          });
        }} 
      />
    </View>
  );
};

export default AddFriendScreen;
