/**
 *
 * Copyright  reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
  StyleSheet,
  WebView,
  BackHandler,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';

// import * as WeChat from 'react-native-wechat';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import ToastUtil from '../../utils/ToastUtil';
import LoadingView from '../../components/LoadingView';
import { formatStringWithHtml } from '../../utils/FormatUtil';

let canGoBack = false;
const shareIconWechat = require('../../img/share_icon_wechat.png');
const shareIconMoments = require('../../img/share_icon_moments.png');

class WebViewPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.article.userName,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" size={25} color={tintColor} />
    ),
    headerRight: (
      <Icon.Button
        name="md-share"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isShareModal: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleShare: this.onActionSelected });
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.goBack);
  }

  onActionSelected = () => {
    this.setState({
      isShareModal: true
    });
  };

  onNavigationStateChange = (navState) => {
    canGoBack = navState.canGoBack;
  };

  goBack = () => {
    if (this.state.isShareModal) {
      this.setState({
        isShareModal: false
      });
      return true;
    } else if (canGoBack) {
      this.webview.goBack();
      return true;
    }
    return false;
  };

  renderLoading = () => <LoadingView />;

  renderSpinner = () => {
    const { params } = this.props.navigation.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            isShareModal: false
          });
        }}
      >

      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={styles.container}>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  shareParent: {
    flexDirection: 'row',
    marginTop: 20
  },
  shareContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
});

export default WebViewPage;
