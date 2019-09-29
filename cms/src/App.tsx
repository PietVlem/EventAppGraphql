import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

/* 
Components 
*/
import Login from './pages/login';

/* 
Router 
*/
import AdminRouter from './router/adminRouter';

/* 
Style 
*/
import './sass/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const signedIn = localStorage.getItem("signedIn");
    if (signedIn) return setIsLoggedIn(true);
  }, [isLoggedIn])

  return (
    <ApolloProvider client={client}>
      {!isLoggedIn &&
        <Login loggingIn={setIsLoggedIn} />
      }
      {isLoggedIn &&
        <AdminRouter/>
      }
    </ApolloProvider>
  );
}

export default App;
