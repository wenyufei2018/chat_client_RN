import React, { useContext} from 'react';
import RN, {View, StyleSheet, Keyboard} from 'react-native';
import { loyoutItemContext } from '..';
import Middle from './Middle';
import Right from './Right';
import Left from './Left';

export const styles = StyleSheet.create({
  icon: {
      tintColor: '#5e6472',
      backgroundColor: 'transparent',
      width : 28,
      height: 28,
      marginLeft: 10,
      marginRight: 8,
      marginTop: 10,
  },
  button_Text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
});

interface InputToolBarProps {
  inputElRef: React.RefObject<RN.TextInput>;
}
const InputToolBar: React.FC<InputToolBarProps> = (props) => {

  const { isFixed, loyoutFixed, loyout, setInputToolBarY } = useContext(loyoutItemContext);
  const {inputElRef} = props;

  // 关闭键盘
  const KBDissmiss = () => {
    Keyboard.dismiss();
  };

  // 打开键盘
  const KBShow = () => {
    if (loyout === 'voiceShow') {
      // TODO: 没有输入框
      console.warn('怎么解决');
    } else {
      inputElRef.current?.focus();
    }
  };

  const LoyoutStyle = (): RN.StyleProp<RN.ViewStyle> => {
    if (isFixed) {
      return {
        position: 'absolute',
        top: loyoutFixed.InputToolBar.y,
      };
    } else {
      return {

      };
    }
  };

  return(
    <View
      style = {[LoyoutStyle(), {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }]}
      onLayout = { (event) => {
        ({y: loyoutFixed.InputToolBar.y, height: loyoutFixed.InputToolBar.height } = event.nativeEvent.layout);
        setInputToolBarY(event.nativeEvent.layout.y);
      }}
    >
      <Left
        KBDissmiss = {KBDissmiss}
        KBShow = {KBShow}
      />
      <Middle
        inputElRef = {inputElRef}
      />
      <Right
        KBDissmiss = {KBDissmiss}
        KBShow = {KBShow}
        inputElRef = {inputElRef}
      />
    </View>
  );
};

export default InputToolBar;
