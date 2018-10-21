
import React from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';


class About extends React.Component {
  static navigationOptions = {
    title: '我',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-information-circle" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>用户中心</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

export default About;
