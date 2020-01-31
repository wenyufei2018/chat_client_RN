import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Color} from '../../constances';
import {emojisShow} from '../../init';
import {MessagesContext} from '../..';
import {deleteLastChar} from '../../utils';

const Emoji: React.FC = () => {
  const [viewLoyout, setViewLoyout] = useState<{height: number; width: number}>(
    {height: 0, width: 0},
  );
  const {setMessageContent, messageContent} = useContext(MessagesContext);
  const renderEmoji = (item: string, j: number): React.ReactNode => {
    return (
      <Text
        style={{fontSize: 25}}
        key={j}
        onPress={() => {
          setMessageContent(messageContent + item);
        }}>
        {item}
      </Text>
    );
  };

  const handleDelete = () => {
    setMessageContent(deleteLastChar(messageContent));
  };

  return (
    <View
      style={{
        backgroundColor: Color.white,
      }}
      onLayout={e => {
        setViewLoyout({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        });
      }}>
      <ScrollView>
        {emojisShow.map((row, i) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
            key={i}>
            {row.map(renderEmoji)}
          </View>
        ))}
      </ScrollView>
      <TouchableWithoutFeedback onPress={handleDelete}>
        <Image
          source={require('../../images/del.png')}
          resizeMode={'contain'}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: viewLoyout.height - 80,
            left: viewLoyout.width - 80,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Emoji;
