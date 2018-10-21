/** @format */

import { AppRegistry } from 'react-native';
import Root from './app/root';
// import Root from './App';

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true ;
AppRegistry.registerComponent('reading', () => Root);