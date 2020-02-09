/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {Color} from '../../constances';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: screenWidth * 0.13,
    width: screenWidth * 0.13,
    marginHorizontal: screenWidth * 0.05,
    borderRadius: 8,
  },
  icon: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
  },
  textView: {
    alignItems: 'center',
    paddingTop: 5,
  },
});

const Function: React.FC = () => {
  const handlePromiseSelectPhoto = () => {
    console.warn('点开相册');
  };

  const handlePromiseCamera = () => {
    console.warn('开始拍摄');
  };

  return (
    <View
      style={{
        backgroundColor: Color.white,
        paddingTop: screenWidth * 0.1,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback onPress={handlePromiseSelectPhoto}>
          <View>
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Image
                  source={require('../../images/xiangce.png')}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.textView}>
              <Text>相册</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handlePromiseCamera}>
          <View>
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Image
                  source={require('../../images/xiangji.png')}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.textView}>
              <Text>拍摄</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View />
    </View>
  );
};

export default Function;
