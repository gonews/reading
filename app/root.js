
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import App from './containers/app';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const store = configureStore();

// run root saga
store.runSaga(rootSaga);
const client = new ApolloClient({
    uri: "http://192.168.100.19:8090/graphql"
});

const Root = () => (
  <Provider store={store}>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </Provider>
);

export default Root;
