import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../views/Home';
import DetailsScreen from '../views/DetailsScreen';

const Home = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const Details = createStackNavigator(
  {
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Details',
  },
);

const AppNavigator = createBottomTabNavigator({
  Home: {screen: Home},
  Details: {screen: Details},
});

export const UserNavigator = createAppContainer(AppNavigator);
