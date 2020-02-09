import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
// @ts-ignore
import ParsedText from 'react-native-parsed-text';
import Communications from 'react-native-communications';
import {IMessage} from '../../types';

const WWW_URL_PATTERN = /^www\./i;

const textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
};

// TODO: 电话选择
// const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel'];

export interface MessageTextProps {
  position: 'left' | 'right';
  currentMessage: IMessage;
}

const MessageText: React.FC<MessageTextProps> = props => {
  const {position, currentMessage} = props;

  const onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.error('No handler for URL:', url);
        } else {
          Linking.openURL(url);
        }
      });
    }
  };

  const onPhonePress = (phone: string) => {
    Communications.phonecall(phone, true);
  };

  const onEmailPress = (email: string) =>
    Communications.email([email], null, null, null, null);

  const linkStyle = [styles[position].link];

  return (
    <View style={[styles[position].container]}>
      <ParsedText
        style={[styles[position].text]}
        parse={[
          {type: 'url', style: linkStyle, onPress: onUrlPress},
          {type: 'phone', style: linkStyle, onPress: onPhonePress},
          {type: 'email', style: linkStyle, onPress: onEmailPress},
        ]}>
        {currentMessage!.content}
      </ParsedText>
    </View>
  );
};

export default MessageText;
