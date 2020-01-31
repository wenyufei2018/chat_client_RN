import React, { createContext, useState, useEffect, useRef } from 'react';
import RN, { View, Keyboard } from 'react-native';
import InputToolBar from './InputToolBar';
import MessageContainer from './MessageContainer';
import Plus from './Plus';
import {isPlus} from './utils';
import Init from './init';
import VoiceAnimate from './voiceAnimate';

export const loyoutItemContext = createContext<ILoyoutItemContext>({
  loyout: 'noShow',
  setLoyout: () => {},
  isFixed: false,
  setFixed: () => {},
  loyoutFixed:  {InputToolBar: {y: 0, height: 0}, keyBoardHeight: 0},
  inputToolBarY: 0,
  setInputToolBarY: () => {},
});

export const MessagesContext = createContext<IMessagesContext>({
  messages: [],
  user: {_id: 0},
  messageContent: '',
  setMessageContent: () => {},
  voiceState: 'cancel',
  setVoiceState: () => {},
  onSend: () => {},
});

const loyoutFixed = {
  InputToolBar: {
    y: 0,
    height: 0,
  },
  keyBoardHeight: 0,
};

const keyboardDidShow: RN.KeyboardEventListener = (e) => {
  if (! loyoutFixed.keyBoardHeight) {
    // TODO: 是否一定能测出高度，有待测试
    console.warn('初始化键盘高度', e.endCoordinates.height);
    loyoutFixed.keyBoardHeight = e.endCoordinates.height;
  }
};

Keyboard.addListener('keyboardDidShow', keyboardDidShow);

interface ChatProps {
  messages: IMessage[];
  user: User;
  onSend: (message: IMessage) => void;
}

const Chat: React.FC<ChatProps> = (props) => {
  const {messages, user, onSend} = props;
  const [loyout, setLoyout] = useState<ILoyoutItem>('keyBoardShow');
  const [isFixed, setFixed] = useState<boolean>(false);
  const [inputToolBarY, setInputToolBarY] = useState<number>(0);
  const inputElRef = useRef<RN.TextInput>(null);
  const [messageContent, setMessageContent] = useState<string>('');
  const [voiceState, setVoiceState] = useState<IVoiceState>('cancel');

  useEffect( () => {
  }, [voiceState]);

  console.log('查看轮廓定位指标', loyoutFixed, loyout, isFixed);
  const LoyoutStyle = (): RN.StyleProp<RN.ViewStyle> => {
    if (isFixed) {
      return {
      };
    } else {
      return {
      };
    }
  };

  useEffect(() => {
    inputElRef.current?.focus();
    Init();
  }, []);

  return(
    <View
      style = {[LoyoutStyle(), {
        flex: 1,
        justifyContent : 'flex-end',
      }]}
    >
      <loyoutItemContext.Provider
        value = {{loyout, setLoyout, isFixed, setFixed, loyoutFixed, inputToolBarY, setInputToolBarY}}
      >
        <MessagesContext.Provider
          value = {{messages, user, onSend, messageContent, setMessageContent, voiceState, setVoiceState}}
        >
          <MessageContainer/>
          <InputToolBar
            inputElRef = {inputElRef}
          />
          {isPlus(loyout) && <Plus />}
          {loyout === 'voiceShow' && <VoiceAnimate/>}
        </MessagesContext.Provider>
      </loyoutItemContext.Provider>
    </View>
  );
};

export default Chat;

// <VoiceAnimate/>
