/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import Chat from '../components/wechat-chat';
import {testUserMessages, selfUser, frinedUser} from '../test';
import MessageService from '../utils/reaml/messageService';

let messageService: MessageService;

interface IChatScreen {
  navigation: NavigationScreenProp<{}>;
}

const ChatScreen: React.FC<IChatScreen> = () => {
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  
  useEffect( () => {
    console.warn('++++++++++++++');
    messageService = new MessageService();
    setMessages( messageService.findAll(frinedUser) || []);
    return () => {
      messageService.close();
      console.warn('----------------');
    };
  }, []);
  
  useEffect(() => {
    // TODO: 解决reaml数据重复的问题
    if (messages.length > 0) {
      const tmp = messages[messages.length - 1];
      console.log('添加数据', tmp);
      messageService.saveOneUser([tmp], tmp.user);
    }
  }, [messages] );
  
  return (
    <View style={{flex: 1}}>
      <Chat
        messages={testUserMessages}
        user={selfUser}
        onSend={currentMessage => {
          setMessages([currentMessage].concat(messages));
        }}
      />
    </View>
  );
};

export default ChatScreen;
