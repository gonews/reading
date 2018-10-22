/** @format */

import React from "react";
import { AppRegistry } from 'react-native';
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
import Root from './app/root';
// import Root from './App';

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true ;
AppRegistry.registerComponent('reading', () => Root);


// const client = new ApolloClient({
//     uri: "http://192.168.100.19:8090/graphql"
// });
//
// const App = () => (
//     <ApolloProvider client={client}>
//         <Root />
//     </ApolloProvider>
// );

// const Client = () => {
//     const networkInterface = createNetworkInterface({
//         uri: 'http://192.168.100.19:8090/graphql'
//     })
//     const client = new ApolloClient({
//         networkInterface
//     });
//     return (
//         <ApolloProvider client={client}>
//             <Root />
//         </ApolloProvider>)
// }

// AppRegistry.registerComponent('reading', () => App);