import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import MutationQueueLink from '@adobe/apollo-link-mutation-queue';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client';
import Adapter from './adapter';
import { saveStoreItemAsync, getStoreItemAsync } from './utils/secureStore';
import BottomTabsBottomTabs from './components/BottomTabs';
import Global from './Global';
const apiBase = HomePage.graphql;

// import { useApp } from './useApp';
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import LocaleProvider from './localeProvider';
import CartProvider from './cartProvider';

import { GestureHandlerRootView } from 'react-native-gesture-handler' // fix Carousel swap not smooth
import store from './redux/store';


///connect graphql start
const authLink = setContext(
  async (_, { headers }) => {
    // get the authentication token from local storage if it exists.

    const token = await getStoreItemAsync('token');
    // const token = '';
    console.log('APP token', token);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  }
);



const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);

  if (response) {
    const { data, errors } = response;
    let pathToCartItems;

    // It's within the GraphQL spec to receive data and errors, where errors are merely informational and not
    // intended to block. Almost all existing components were not built with this in mind, so we build special
    // handling of this error message so we can deal with it at the time we deem appropriate.
    errors.forEach(({ message, path }, index) => {
      if (
        message === 'Some of the products are out of stock.' ||
        message === 'There are no source items with the in stock status'
      ) {
        if (!pathToCartItems) {
          pathToCartItems = path.slice(0, -1);
        }

        // Set the error to null to be cleaned up later
        response.errors[index] = null;
      }
    });

    // indicator that we have some cleanup to perform on the response

  }
});

const apolloLink = ApolloLink.from([
  new MutationQueueLink(),
  new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
    }
  }),
  authLink,
  Adapter.storeLink,
  errorLink,
  Adapter.apolloLink(apiBase)
]);


export default function App() {

  // const talons = useApp({})

  // console.log('client', client);

  return (
    <Adapter apiBase={apiBase} apollo={{ link: apolloLink }} store={store}>
      <LocaleProvider>
        <CartProvider />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <BottomTabsBottomTabs />
        </GestureHandlerRootView>
      </LocaleProvider>
    </Adapter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
