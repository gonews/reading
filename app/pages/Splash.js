
import React from 'react';
import { Dimensions, Animated } from 'react-native';
import store from 'react-native-simple-store';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };

  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    SplashScreen.hide();
    this.timer = setTimeout(() => {
      store.get('isInit').then((isInit) => {
        if (!isInit) {
          navigate('Category', { isFirst: true });
        } else {
          NavigationUtil.reset(this.props.navigation, 'Home');
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

export default Splash;
