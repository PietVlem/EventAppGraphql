import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

/*
Constants
*/
import colors from '../constants/colors';

interface TabBarItemProps {
  iconName: String,
  title?: String,
  focused: Boolean,
}

const TabBarItem = ({ iconName ,title, focused }: TabBarItemProps) => {
  return (
    <View style={stylesheet.container}>
      <Feather
        name={iconName}
        size={26}
        style={stylesheet.icon}
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
      />
      {/* title != null &&
        <Text 
          style={focused ? stylesheet.textSelected : stylesheet.textDefault}>
          {title}
        </Text> */
      }
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container:{
    //backgroundColor: 'red',
    flexDirection: 'row'
  },
  icon:{
    marginBottom: -15,
  },
  textSelected:{
    marginLeft: 15,
    color: colors.tabIconSelected,
    fontFamily: 'Raleway-Black',
    fontSize: 18,
  },
  textDefault:{
    marginLeft: 15,
    color: colors.tabIconDefault,
    fontFamily: 'Raleway-Black',
    fontSize: 18,
  }
})

export default TabBarItem;