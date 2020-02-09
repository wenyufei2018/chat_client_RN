import React, {useContext, useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {ListItem} from 'react-native-elements';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {IMessage, IUser} from '../chat';
import {userInfoContext} from '../index';

const userInitGql = gql`
  query userInit($userId: String!, $length: Int!){
    userInit(userId:$userId, length:$length){
      friend{
        userId
        avatar
      }
      messages{
        type
        content
        created
        messageId
        users
        userId
      }
    }
  }
`

interface IUserInitReslut{
  userInit: {
    friend: IUser;
    messages?: IMessage[];
  }[]
}

const userSubscriptionGql = gql`
  subscription userSubscription($userId: String!){
    userSubscription(userId: $userId){
      type
      newFriend{
        friends
        userId
        avatar
      }
      newMessage{
        type
        content
        created
        messageId
        users
        userId
      }
    }
  }
`

interface IUserSubscriptionReslut{
  userSubscription:{
    type: string;
    newFriend?: IUser;
    newMessage?: IMessage;
  }
}

export interface IChatInfo{
  [key: string]:{
    messages?: IMessage[];
    friendInfo: IUser;
  }
}

export const fixChatInfo = (userInitData: IUserInitReslut):IChatInfo => {
  const res:IChatInfo = {};
  for(const item of userInitData.userInit){
    console.log('查看', item);
    res[item.friend.userId] = {
      messages: item.messages || [],
      friendInfo: item.friend,
    }
  }
  return res;
};

export const addFriendState = (chatInfo: IChatInfo, newFriend: IUser): IChatInfo =>{
  const res = {...chatInfo, [newFriend.userId]:{
    messages: [],
    friendInfo: newFriend
  }}
  return res;
}

export const addMessageState = (chatInfo: IChatInfo, newMessage: IMessage, chatInfoKey: string): IChatInfo => {
  const res = {...chatInfo, [chatInfoKey]:{
    messages: [...(chatInfo[chatInfoKey].messages || []), newMessage],
    friendInfo: chatInfo[chatInfoKey].friendInfo
  }}

  console.log('添加消息', res);
  
  return res;
}

interface IUserProps {
  userInitData: IUserInitReslut;
  userId: string;
  navigation: NavigationStackProp;
}

const User: React.FC<IUserProps> = (props) => {
  const {userInitData, userId} = props;
  const [chatInfo, setChatInfo] = useState<IChatInfo>(fixChatInfo(userInitData));

  const {data: userSubscriptionData, error: userSubscriptionError} = useSubscription<IUserSubscriptionReslut, {userId: string}>(
    userSubscriptionGql,{variables:{userId}});
  userSubscriptionError && console.error(userSubscriptionError);

  console.log('进来了', userInitData, userId, chatInfo, userSubscriptionData );
  
  useEffect(() => {
    console.log('数据+++++', userSubscriptionData);
    if(!userSubscriptionData) return;
    const {userSubscription} = userSubscriptionData;
    switch(userSubscription?.type){
      case 'newFriend':
        const {newFriend} = userSubscription;
        console.log(newFriend);
        newFriend && setChatInfo(addFriendState(chatInfo, newFriend));
        break
      case 'newMessage':
        const {newMessage} = userSubscription;
        newMessage && setChatInfo(addMessageState(chatInfo, newMessage, newMessage.userId));
        break
      default:
        console.error('userSubscriptionData 添加数据失败')
    }
  }, [userSubscriptionData])

  const [friends, setFriends] = useState<IUser[]>([]);

  useEffect(()=>{
    const tmp: IUser[] = [];
    for(const item in chatInfo){
      tmp.push(chatInfo[item].friendInfo)
    }
    setFriends(tmp)
  },[chatInfo])

  return (
    <View>
      <FlatList
        ListHeaderComponent = {<ListItem
          title={'添加好友'}
          onPress={() => {
            props.navigation.push('AddFriend', {
              userId,
              chatInfo,
              setChatInfo,
            })
          }}
        />}
        data = {friends}
        keyExtractor = {({userId})=>userId}
        renderItem={({item, index})=>{
          const {userId: friendName, avatar} = item;
          const {messages} = chatInfo[friendName];
          let subtitle;
          if(!!messages && messages.length > 0){
            subtitle = messages[messages.length - 1].content;
          }else {
            subtitle = '';
          }

          return(
            <ListItem
              key={index}
              leftAvatar={{source: {uri: (avatar || 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')}}}
              title={friendName}
              subtitle={subtitle}
              bottomDivider
              onPress={({}) => {
                props.navigation.push('Chat',{
                  friendName,
                  userId,
                  chatInfo,
                  setChatInfo,
                });
              }}
          />
          )
        }}
      />
    </View>
  )
};

interface IChatListScreen {
  navigation: NavigationStackProp;
}

const ChatListScreen: React.FC<IChatListScreen> = props => {
  const {userInfo} = useContext(userInfoContext);
  if(!userInfo){
    return <View/>
  }
  const {userId, avatar} = userInfo;

  props.navigation
  
  const {data: userInitData, loading} = useQuery<IUserInitReslut, {userId: string; length: number}>(userInitGql,{
    variables:{userId, length: 2},
  });
  return (
    <View>
      {!loading && <User userInitData={userInitData || {userInit: []}} userId={userId} navigation={props.navigation}/>}
    </View>
  );
};

export default ChatListScreen;
