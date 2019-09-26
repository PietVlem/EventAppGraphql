import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Components


// Style
import './sass/index.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
