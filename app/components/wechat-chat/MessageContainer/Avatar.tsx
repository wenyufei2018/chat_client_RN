import React from 'react';
import {StyleSheet, View, Image, Text, ImageSourcePropType} from 'react-native';
import {Color} from '../constances';

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

  return (
    <View style={[styles[position].container]}>
      {currentMessage.user.avatar ? (
        <Image
          style={[styles[position].image]}
          source={currentMessage.user.avatar as ImageSourcePropType}
        />
      ) : (
        <Text style={[styles[position].image]}>{currentMessage.user._id}</Text>
      )}
    </View>
  );
};

export default Avatar;
