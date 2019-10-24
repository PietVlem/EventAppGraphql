import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/*
Screens
*/
import eventScreen from '../screens/eventScreen';
import productsScreen from '../screens/productsScreen';
import eventDetails from '../screens/eventDetails';
import postsScreen from '../screens/postsScreen';

/*
Components
*/
import TabBarItem from '../components/tabBarItem';

/*
Style
*/
import colors from '../constants/colors';
import styles from '../constants/style';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const EventsStack = createStackNavigator(
  {
    EventsOverview: eventScreen,
    EventDetails: eventDetails
  }
);

EventsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarItem
      focused={focused}
      title="evenementen"
      iconName={Platform.OS === 'ios' ? `calendar` : 'calendar'}
    />
  ),
}

const PostStack = createStackNavigator(
  {
    ProductOverview: postsScreen,
  }
);

PostStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarItem
      focused={focused}
      iconName={Platform.OS === 'ios' ? `message-circle` : 'message-circle'}
    />
  ),
}

const ProductStack = createStackNavigator(
  {
    ProductOverview: productsScreen,
  }
);

ProductStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarItem
      focused={focused}
      iconName={Platform.OS === 'ios' ? `dollar-sign` : 'dollar-sign'}
    />
  ),
}

const TabNavigator = createBottomTabNavigator({
  Events: EventsStack,
  Posts: PostStack,
  Products: ProductStack,
},
{
  tabBarOptions: {
    showLabel: false,
    style: {
      ...styles.boxShadow,
      backgroundColor: colors.app_black,
      borderTopWidth: 0,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      padding: 10,
      position:'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }
  }
});

export default createAppContainer(TabNavigator);