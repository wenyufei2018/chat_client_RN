import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TouristScreen from '../views/TouristScreen';

const AppNavigator = createStackNavigator(
  {
    Tourist: {
      screen: TouristScreen,
    },
  },
  {
    initialRouteName: 'Tourist',
  },
);

export const TouristNavigator = createAppContainer(AppNavigator);
