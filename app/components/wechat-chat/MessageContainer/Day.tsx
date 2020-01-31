import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {Color, DATE_FORMAT, DATE_LOCALE} from '../constances';
import {isSameDay} from '../utils';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

interface DayProps {
  currentMessage: IMessage;
  previousMessage: IMessage | undefined;
}

const Day: React.FC<DayProps> = props => {
  const {currentMessage, previousMessage} = props;

  if (currentMessage && !isSameDay(currentMessage, previousMessage!)) {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.text]}>
          {moment(currentMessage.createdAt)
            .locale(DATE_LOCALE)
            .format(DATE_FORMAT)}
        </Text>
      </View>
    );
  }
  return null;
};

export default Day;
