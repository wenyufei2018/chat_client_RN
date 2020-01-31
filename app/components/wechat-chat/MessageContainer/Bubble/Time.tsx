import React from 'react';
import {StyleSheet, Text, View, TextProps} from 'react-native';

import moment from 'moment';

import {TIME_FORMAT, DATE_LOCALE, Color} from '../../constances';

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.white,
      ...textStyle,
    },
  }),
};

interface TimeProps {
  position: MessagePosition;
  currentMessage: IMessage;
}

const Time: React.FC<TimeProps> = props => {
  const {position, currentMessage} = props;

  return (
    <View style={[styles[position].container]}>
      <Text style={[styles[position].text] as TextProps}>
        {moment(currentMessage.createdAt)
          .locale(DATE_LOCALE)
          .format(TIME_FORMAT)}
      </Text>
    </View>
  );
};

export default Time;
