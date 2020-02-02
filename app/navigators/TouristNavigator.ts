import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TouristScreen from '../views/TouristScreen';
import SignInScreen from '../views/SignInScreen';
import SignUpScreen from '../views/SignUpScreen';

const AppNavigator = createStackNavigator(
  {
    Tourist: {
      screen: TouristScreen,
    },
    SignIn: {
      screen: SignInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    }
  },
  {
    initialRouteName: 'Tourist',
  },
);

export const TouristNavigator = createAppContainer(AppNavigator);
