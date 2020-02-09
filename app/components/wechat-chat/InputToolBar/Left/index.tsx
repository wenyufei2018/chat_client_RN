import React, {useContext} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {loyoutItemContext} from '../..';
import {styles} from '..';

interface ILeft {
  KBDissmiss: () => void;
  KBShow: () => void;
}

const Left: React.FC<ILeft> = props => {
  const {KBDissmiss} = props;
  const {setLoyout, loyout} = useContext(loyoutItemContext);

  const onPress = () => {
    if (loyout === 'voiceShow') {
      setLoyout('keyBoardShow');
      // TODO: 如何解决
      // KBShow();
    } else {
      setLoyout('voiceShow');
      KBDissmiss();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} accessibilityTraits="button">
      {loyout === 'voiceShow' ? (
        <Image
          source={require('../../images/keyboard.png')}
          style={styles.icon}
        />
      ) : (
        <Image source={require('../../images/voice.png')} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

export default Left;
