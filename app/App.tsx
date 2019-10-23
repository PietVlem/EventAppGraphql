import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloCache } from 'apollo-cache';
import { ApolloProvider } from '@apollo/react-hooks';
import * as Font from 'expo-font';

/*
Componenets
*/
import AppNavigator from './src/navigation/appnavigator';

/*
Styles
*/
import colors from './src/constants/colors';

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
      'Raleway-Black': require('./assets/fonts/Raleway-Black.ttf'),
    });
    //setTimeout(function(){ setFontLoaded(true); }, 2000);
    setFontLoaded(true);
  })
  if(!fontLoaded){
    return (
      <View style={{backgroundColor:colors.app_black, flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colors.app_primary} />
      </View>
    )
  }else{
    return (
      <ApolloProvider client={apolloClient as ApolloClient<any>}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}
