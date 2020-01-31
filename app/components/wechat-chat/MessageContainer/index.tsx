import React, {useContext} from 'react';
import RN, {FlatList, View, StyleSheet} from 'react-native';
import {loyoutItemContext, MessagesContext} from '..';
import Message from './Message';
import {Color} from '../constances';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAlignTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  headerWrapper: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
  },
  scrollToBottomStyle: {
    opacity: 0.8,
    position: 'absolute',
    right: 10,
    bottom: 30,
    zIndex: 999,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Color.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
  },
});

const MessageContainer: React.FC = () => {
  const {messages, user} = useContext(MessagesContext);

  const {inputToolBarY} = useContext(loyoutItemContext);

  const LoyoutStyle = (): RN.StyleProp<RN.ViewStyle> => {
    return {
      position: 'absolute',
      top: 0,
      height: inputToolBarY,
      left: 0,
      right: 0,
      backgroundColor: '#FFF',
    };
    // if (isFixed) {
    //   return {
    //     position: 'absolute',
    //     top: 0,
    //     bottom: loyoutFixed.InputToolBar.y,
    //   };
    // } else {
    //   return {
    //     flexGrow: 1,
    //     flexShrink: 1,
    //   };
    // }
  };

  return (
    <View style={[LoyoutStyle()]}>
      <FlatList
        data={messages}
        renderItem={({item, index}) => (
          <Message
            currentMessage={item}
            nextMessage={messages[index + 1]}
            previousMessage={messages[index - 1]}
            position={item.user._id === user._id ? 'right' : 'left'}
          />
        )}
        keyExtractor={item => {
          return item._id + '';
        }}
        style={styles.listStyle}
        contentContainerStyle={styles.contentContainerStyle}
        inverted
      />
    </View>
  );
};

export default MessageContainer;
