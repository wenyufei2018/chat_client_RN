import React from 'react';
import {View, StyleSheet, StyleProp} from 'react-native';
import Day from './Day';
import Avatar from './Avatar';
import Bubble from './Bubble';
import {IMessage, MessagePosition} from '../types';

export interface LeftRightStyle<T> {
  left: StyleProp<T>;
  right: StyleProp<T>;
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
};

interface MessageProps {
  currentMessage: IMessage;
  nextMessage: IMessage | undefined;
  previousMessage: IMessage | undefined;
  position: MessagePosition;
}

const Message: React.FC<MessageProps> = props => {
  const {currentMessage, position, previousMessage} = props;

  return (
    <View>
      <Day currentMessage={currentMessage} previousMessage={previousMessage} />
      <View
        style={[
          styles[position].container,
          // TODO: 调节样式
          // { marginBottom: sameUser ? 2 : 10 },
          // !this.props.inverted && { marginBottom: 2 },
        ]}>
        {position === 'left' ? (
          <Avatar position={position} currentMessage={currentMessage} />
        ) : null}
        <Bubble position={position} currentMessage={currentMessage} />
        {position === 'right' ? (
          <Avatar position={position} currentMessage={currentMessage} />
        ) : null}
      </View>
    </View>
  );
};

export default Message;
