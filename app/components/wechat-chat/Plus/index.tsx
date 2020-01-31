import React, {useContext} from 'react';
import RN, {View} from 'react-native';
import {loyoutItemContext} from '..';
import Emoji from './Emoji';
import Function from './Function';

const Plus: React.FC = () => {
  const {isFixed, loyoutFixed, loyout} = useContext(loyoutItemContext);

  const LoyoutStyle = (): RN.StyleProp<RN.ViewStyle> => {
    if (isFixed) {
      return {
        position: 'absolute',
        top: loyoutFixed.InputToolBar.y + loyoutFixed.InputToolBar.height,
        left: 0,
        right: 0,
      };
    } else {
      return {};
    }
  };

  return (
    <View
      style={[
        LoyoutStyle(),
        {
          flexBasis: loyoutFixed.keyBoardHeight,
        },
      ]}>
      {loyout === 'functionShow' && <Function />}
      {loyout === 'emojiShow' && <Emoji />}
    </View>
  );
};

export default Plus;
