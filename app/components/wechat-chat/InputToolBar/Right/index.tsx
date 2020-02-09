import React, { useContext } from 'react';
import RN, {Keyboard, TouchableOpacity, Image, Text} from 'react-native';
import {loyoutItemContext, MessagesContext} from '../..';
import {styles} from '..';
import uuid from 'uuid';
import { IMessage, ILoyoutItem } from '../../types';

interface IRight {
  inputElRef: React.RefObject<RN.TextInput>;
  KBDissmiss: () => void;
  KBShow: () => void;
}

const Right: React.FC<IRight> = (props) => {

  const {inputElRef, KBDissmiss, KBShow } = props;
  const {setFixed, setLoyout, loyout} = useContext(loyoutItemContext);
  const {messageContent, onSend, user, setMessageContent} = useContext(MessagesContext);

  const onPress = (loyoutThis: ILoyoutItem) => {
    if (loyout === loyoutThis) {
      // 进入特殊模式：打开键盘
      setFixed(true);
      KBShow();
      Keyboard.addListener('keyboardDidShow', () => {
        setLoyout('keyBoardShow');
        setFixed(false);
      });
    } else {
      if (inputElRef.current?.isFocused()) {
        // 此时键盘已经打开，进入特殊模式
        setFixed(true);
        KBDissmiss();
        inputElRef.current.focus();
        Keyboard.addListener('keyboardDidHide', () => {
          setLoyout(loyoutThis);
          setFixed(false);
        });
      } else {
        setLoyout(loyoutThis);
      }
    }
  };

  const renderFunction = () => {
    if ( !!messageContent ) {
      return <Text
          style = {styles.button_Text}
          onPress = {() => {
            const currentMessage: IMessage = {
              messageId: uuid.v4(),
              type: 'text',
              content: messageContent,
              created: new Date(),
              userId: user.userId,
              users: [],
            };
            onSend(currentMessage);
            setMessageContent('');
          }}
        >发送</Text>;
    } else {
      return <TouchableOpacity
        onPress={() => { onPress('functionShow'); } }
          accessibilityTraits='button'
        >
        {loyout === 'functionShow' ?
            <Image
                source={ require('../../images/keyboard.png')}
                style={ styles.icon }
            /> :
            <Image
                source={ require('../../images/function.png')}
                style={ styles.icon }
            />
          }
        </TouchableOpacity>;
    }
  };

  return(
    <>
      <TouchableOpacity
        onPress={() => { onPress('emojiShow'); } }
        accessibilityTraits='button'
      >
        {loyout === 'emojiShow' ?
          <Image
              source={ require('../../images/keyboard.png')}
              style={ styles.icon }
          /> :
          <Image
              source={ require('../../images/emoji.png')}
              style={ styles.icon }
          />
        }
      </TouchableOpacity>
      {
        renderFunction()
      }
    </>
  );
};

export default Right;
