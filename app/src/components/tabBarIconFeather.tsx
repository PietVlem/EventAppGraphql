import React from 'react';
import { Feather } from '@expo/vector-icons';

/*
Constants
*/
import Colors from '../constants/colors';

export default function TabBarIconFeather(props) {
  return (
    <Feather
      name={props.name}
      size={26}
      style={{ marginBottom: -15 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}