import {
  View,
  Text,
  Button,
} from 'react-native';
import * as React from 'react';
import MessageService from './messageService';
import UserService from './userService';
import { testUserMessages, frinedUser, selfUser } from '../../test';

export class TestRealm extends React.Component {

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log('在这里');
  }

  render() {
    return (
      <View>
        <Text>{'更改'}</Text>
        <Button title={'更新用户数据'} onPress={() => {
          const userService = new UserService();
          userService.update(frinedUser);
          userService.update(selfUser);
          userService.close();
        }}/>
        <Button title={'初始化聊天数据'} onPress={() => {
          const messageService = new MessageService();
          // messageService.saveOneUser(testUserMessages, frinedUser);
          messageService.saveOneUser(testUserMessages, selfUser);
          messageService.close();
        }}/>
        <Button title={'查询用户'} onPress={() => {
          const userService = new UserService();
          for (const item  of userService.findAll() || []) {
            console.log('查询', item);
          }
          userService.close();
        }}/>
        <Button title={'查询聊天'} onPress={() => {
          const messageService = new MessageService();
          for (const item  of messageService.findAll(frinedUser) || []) {
            console.log('查询', item);
            console.log(item._id, item.user, item.user._id, item.content);
          }
          messageService.close();
        }}/>
      </View>
    );
  }
}
