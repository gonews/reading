
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../pages/MainPage/Main';
import * as readCreators from '../actions/read';

class MainContainer extends React.Component {
  static navigationOptions = {
    title: '资讯',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-home" size={25} color={tintColor} />
    )
  };

  static componentDidMount() {

  }

  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { read } = state;
  return {
    read
  };
};

const mapDispatchToProps = (dispatch) => {
  const readActions = bindActionCreators(readCreators, dispatch);
  return {
    readActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
