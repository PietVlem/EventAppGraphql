import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './apollo/apollo';

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


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const signedIn = localStorage.getItem("graphqlApp_signedIn");
    if (signedIn) return setIsLoggedIn(true);
  }, [isLoggedIn])

  return (
    <ApolloProvider client={apolloClient}>
      {!isLoggedIn &&
        <Login loggingIn={setIsLoggedIn} />
      }
      {isLoggedIn &&
        <AdminRouter />
      }
    </ApolloProvider>
  );
}

export default App;
