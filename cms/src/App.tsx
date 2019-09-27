import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components
import Login from './pages/login';

// Style
import './sass/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      {!isLoggedIn &&
        <Login loggingIn={setIsLoggedIn}/>
      }
      {isLoggedIn &&
        <div className="main">
          <div className="container">
            <div className="grid">
              <div className="grid__item medium--one-half">
                <p>one-half</p>
              </div>
              <div className="grid__item medium--one-half">
                <p>one-half</p>
              </div>
            </div>
          </div>
        </div>
      }
    </ApolloProvider>
  );
}

export default App;
