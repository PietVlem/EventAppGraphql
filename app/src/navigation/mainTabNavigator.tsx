import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/*
Screens
*/
import homeScreen from '../screens/homeScreen';
import productsScreen from '../screens/productsScreen';
import eventDetails from '../screens/eventDetails';

/*
Components
*/
import TabBarIconFeather from '../components/tabBarIconFeather';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const EventsStack = createStackNavigator(
  {
    EventsOverview: homeScreen,
    EventDetails: eventDetails
  }
);

EventsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIconFeather
      focused={focused}
      name={Platform.OS === 'ios' ? `calendar` : 'calendar'}
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
    <TabBarIconFeather
      focused={focused}
      name={Platform.OS === 'ios' ? `map` : 'map'}
    />
  ),
}

const TabNavigator = createBottomTabNavigator({
  Events: EventsStack,
  Products: ProductStack,
},
{
  tabBarOptions: {
    showLabel: false,
    style: {
      borderTopWidth: 0,
      shadowOffset: { width: 0, height: -8, },
      shadowColor: 'black',
      shadowOpacity: 0.05,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    }
  }
});

export default createAppContainer(TabNavigator);