/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import Chat from '../components/wechat-chat';
import gql from 'graphql-tag';
import {IChatInfo, addMessageState} from './ChatListScreen';
import { useMutation } from '@apollo/react-hooks';

import {IMessage} from '../chat';
import {userInfoContext} from '../index';

interface IAddMessageResult {
  addMessage: {
    status: string;
    message: IMessage;
  };
}

interface IAddMessageInput {
  users: string[];
  content: string;
  userId: string;
  type: string;
};

export const addMessageGql = gql`
  mutation addMessage($content: String!, $users: [String!]!, $userId: String!, $type: MessageType! ) {
    addMessage(content: $content, type: $type, users: $users, userId: $userId) {
      status
      message {
        users
        type
        userId
        content
        created
        messageId
      }
    }
  }
`;

interface IChatProps {
  friendName: string;
  userId: string;
  chatInfo: IChatInfo;
  setChatInfo: (chatInfo: IChatInfo) => void;
}

const ChatScreen: React.FC<{
  navigation: {state: {params: IChatProps}};
}> = (props) => {
  const {
    friendName,
    chatInfo,
    setChatInfo,
    userId,
  } = props.navigation.state.params;

  const {messages, friendInfo} = chatInfo[friendName];
  const [addMessage] = useMutation<IAddMessageResult, IAddMessageInput>(
    addMessageGql,
  );

  const {userInfo} = useContext(userInfoContext);

  return (
    <View style={{flex: 1}}>
      {!!userInfo && <Chat
        messages={messages || []}
        friend={friendInfo}
        user={userInfo}
        onSend={currentMessage => {
          const {content, type} = currentMessage;

          addMessage({
            variables: {
              content,
              users: [userId, friendName],
              userId,
              type,
            },
          })
          .then((res) => {
            if(res.data?.addMessage){
              const {status, message} = res.data?.addMessage;
              if(status === "sucess"){
                setChatInfo(addMessageState(chatInfo, message, friendName));
              }
            }
          })
          .catch((err) => {
            console.warn(err);
          });
        }}
      />}
    </View>
  );
};

export default ChatScreen;
