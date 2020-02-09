import React, {useContext} from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from 'react-native';
import {Color} from '../constances';
import {IMessage, MessagePosition} from '../types';
import {MessagesContext} from '..';

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
      backgroundColor: Color.emerald,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
      backgroundColor: Color.carrot,
    },
  }),
};

export interface AvatarProps {
  currentMessage: IMessage;
  position: MessagePosition;
}

const Avatar: React.FC<AvatarProps> = props => {
  const {currentMessage, position} = props;
  const {user, friend} = useContext(MessagesContext);
  const sendUser = currentMessage.userId === user.userId ? user : friend;

  return (
    <View style={[styles[position].container]}>
      {sendUser.avatar ? (
        <Image
          style={[styles[position].image]}
          source={sendUser.avatar as ImageSourcePropType}
        />
      ) : (
        <Text style={[styles[position].image]}>{sendUser.userId}</Text>
      )}
    </View>
  );
};

export default Avatar;
