import React, {useContext, useState} from 'react';
import RN, {TextInput, Text, Keyboard, View, PanResponder} from 'react-native';
import {loyoutItemContext, MessagesContext} from '../..';
import {isPlus} from '../../utils';
import {VoiceAnimateBottom} from '../../constances';

interface IMiddleProps {
  inputElRef: React.RefObject<RN.TextInput>;
}

const Middle: React.FC<IMiddleProps> = props => {
  const {inputElRef} = props;
  const {loyout, setFixed, setLoyout} = useContext(loyoutItemContext);
  const {
    messageContent,
    setMessageContent,
    voiceState,
    setVoiceState,
  } = useContext(MessagesContext);
  const [textInputHeight, setTextInputHeight] = useState(0);

  // 触摸系统
  const _panResponder: RN.PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => loyout === 'voiceShow',
    onMoveShouldSetPanResponder: () => loyout === 'voiceShow',
    onPanResponderGrant: () => setVoiceState('recording'),
    onPanResponderMove: (_e, gestureState) => {
      if (gestureState.moveY < VoiceAnimateBottom) {
        setVoiceState('giveUp');
      } else {
        setVoiceState('recording');
      }
    },
    onPanResponderRelease: () => setVoiceState('cancel'),
  });

  const renderText = () => {
    switch (voiceState) {
      case 'recording':
        return '松开 发送';
      case 'giveUp':
        return '松开 取消';
      default:
        return '按下 录音';
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 6,
        flexGrow: 1,
        flexShrink: 1,
      }}
      {..._panResponder.panHandlers}>
      {loyout !== 'voiceShow' ? (
        <TextInput
          onFocus={() => {
            if (isPlus(loyout)) {
              // 进入特殊模式
              setFixed(true);
              Keyboard.addListener('keyboardDidShow', () => {
                setFixed(false);
                setLoyout('keyBoardShow');
              });
            } else {
              setLoyout('keyBoardShow');
            }
          }}
          ref={inputElRef}
          value={messageContent}
          multiline={true}
          style={{fontSize: 18, height: textInputHeight}}
          onChangeText={Content => setMessageContent(Content)}
          onContentSizeChange={event => {
            const {height} = event.nativeEvent.contentSize;
            setTextInputHeight(height <= 130 ? height : 130);
          }}
        />
      ) : (
        <Text
          style={{
            backgroundColor: voiceState !== 'cancel' ? '#bbb' : '#fff',
            color: '#000',
            textAlign: 'center',
            lineHeight: 45,
            fontSize: 18,
          }}>
          {renderText()}
        </Text>
      )}
    </View>
  );
};

export default Middle;
