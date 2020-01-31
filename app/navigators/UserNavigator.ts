import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../views/HomeScreen';
import DetailsScreen from '../views/DetailsScreen';
import ChatListScreen from '../views/ChatListScreen';
import ChatScreen from '../views/ChatScreen';
import {TestRealm} from '../utils/reaml/testDB';

const Home = createStackNavigator(
  {
    Home: {
      screen: TestRealm,
      // screen: HomeScreen,
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

const ChatList = createStackNavigator(
  {
    ChatList: {
      screen: ChatListScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  {
    initialRouteName: 'ChatList',
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: {screen: Home},
    ChatList: {screen: ChatList},
    Details: {screen: Details},
  },
  {
    initialRouteName: 'ChatList',
  },
);

export const UserNavigator = createAppContainer(AppNavigator);
