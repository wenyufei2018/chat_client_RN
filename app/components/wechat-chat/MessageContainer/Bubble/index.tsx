import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Color} from '../../constances';
import MessageText from './MessageText';
import Time from './Time';

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: Color.leftBubbleBackground,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: Color.defaultBlue,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
  content: StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: Color.backgroundTransparent,
      color: Color.white,
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: '#aaa',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
};

interface BubbleProps {
  position: MessagePosition;
  currentMessage: IMessage;
}

const Bubble: React.FC<BubbleProps> = props => {
  const {position, currentMessage} = props;
  const onLongPress = () => {
    console.log('长按');
  };

  const renderBubbleContent = () => {
    switch (currentMessage.type) {
      case 'text':
        return (
          <MessageText position={position} currentMessage={currentMessage} />
        );
      default:
        return null;
    }
  };

  const renderTime = () => {
    return <Time currentMessage={currentMessage} position={position} />;
  };

  return (
    <View style={[styles[position].container]}>
      <View style={[styles[position].wrapper]}>
        <TouchableWithoutFeedback
          onLongPress={onLongPress}
          accessibilityTraits="text">
          <View>
            {renderBubbleContent()}
            <View style={[styles[position].bottom]}>{renderTime()}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Bubble;
