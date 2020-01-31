import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import {MessagesContext} from '.';

const {height: WindowHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

const voiceVolumeImages = [
  require('./images/speak0.png'),
  require('./images/speak1.png'),
  require('./images/speak2.png'),
  require('./images/speak3.png'),
  require('./images/speak4.png'),
  require('./images/speak5.png'),
  require('./images/speak6.png'),
  require('./images/speak7.png'),
  require('./images/speak8.png'),
];
const voiceVolumeFix = (voiceVolume: number): number => {
  let source: number = 0;
  if (voiceVolume >= 0 && voiceVolume < 1) {
    source = 0;
  } else if (voiceVolume >= 1 && voiceVolume < 2) {
    source = 1;
  } else if (voiceVolume >= 2 && voiceVolume < 3) {
    source = 2;
  } else if (voiceVolume >= 3 && voiceVolume < 4) {
    source = 3;
  } else if (voiceVolume >= 4 && voiceVolume < 5) {
    source = 4;
  } else if (voiceVolume >= 5 && voiceVolume < 6) {
    source = 5;
  } else if (voiceVolume >= 6 && voiceVolume < 7) {
    source = 6;
  } else if (voiceVolume >= 7 && voiceVolume < 8) {
    source = 7;
  } else {
    source = 8;
  }
  return source;
};

const VoiceAnimate: React.FC = () => {
  const [voiceVolume, setVoiceVolume] = useState<number>(0);
  const {voiceState} = useContext(MessagesContext);

  useEffect(() => {
    const timerID = setInterval(() => {
      const num = Math.floor(Math.random() * 10);
      setVoiceVolume(num);
    }, 300);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const _renderContent = () => {
    console.log(voiceVolumeFix(voiceVolume));
    console.log();
    switch (voiceState) {
      case 'loading':
        return (
          <View
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#fff'} size="large" />
          </View>
        );
      case 'recording':
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              source={voiceVolumeImages[voiceVolumeFix(voiceVolume)]}
              style={{width: 60, height: 60, marginVertical: 25}}
            />
            <Text style={{color: '#fff', textAlign: 'center'}}>
              手指上划，取消发送
            </Text>
          </View>
        );
      case 'timeShort':
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              height: 150,
            }}>
            <Image
              source={require('./images/voiceError.png')}
              style={{width: 60, height: 60}}
            />
            <Text style={{color: '#fff', marginTop: 10, textAlign: 'center'}}>
              说话时间太短
            </Text>
          </View>
        );
      case 'giveUp':
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              height: 150,
            }}>
            <Image
              source={require('./images/voiceCancel.png')}
              style={{width: 60, height: 60}}
            />
            <Text style={{color: '#fff', marginTop: 10}}>松开手指取消发送</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[styles.container, {top: (WindowHeight - 64 - 44 - 200) / 2}]}
      pointerEvents="none">
      <Animated.View style={[styles.content]}>{_renderContent()}</Animated.View>
    </View>
  );
};

export default VoiceAnimate;
