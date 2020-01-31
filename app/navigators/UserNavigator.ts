import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../views/HomeScreen';
import DetailsScreen from '../views/DetailsScreen';
import ChatListScreen from '../views/ChatListScreen';
import ChatScreen from '../views/ChatScreen';

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
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    }
  },
);


const AppNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeScreen}, // TestRealm
    ChatList: {screen: ChatList},
    Details: {screen: DetailsScreen},
  },
  {
    initialRouteName: 'ChatList',
  },
);

export const UserNavigator = createAppContainer(AppNavigator);
