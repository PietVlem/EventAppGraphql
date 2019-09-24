import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloCache } from 'apollo-cache';
import { ApolloProvider } from '@apollo/react-hooks';
import * as Font from 'expo-font';

import AppNavigator from './src/navigation/appnavigator';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>,
  link: new HttpLink({ uri: 'http://localhost:4000/' }),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
      'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'NeoSansPro-Bold': require('./assets/fonts/NeoSansPro-Bold.otf'),
    });
    setFontLoaded(true);
  })
  if(!fontLoaded){
    return <Text>Loading</Text>
  }else{
    return (
      <ApolloProvider client={apolloClient as ApolloClient<any>}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}
