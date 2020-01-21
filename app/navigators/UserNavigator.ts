import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../views/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export const UserNavigator = createAppContainer(AppNavigator);
