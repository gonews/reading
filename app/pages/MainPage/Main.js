
import React from 'react';
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  ListView,
  StyleSheet,
  View,
    Text
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import { SafeAreaView } from 'react-navigation';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { getArticleList, getTypeName } from '../../utils/ItemsUtil';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import ReadList from './ReadList'


const propTypes = {
  readActions: PropTypes.object,
  read: PropTypes.object.isRequired
};

const pages = [];
let loadMoreTime = 0;
let currentLoadMoreTypeId;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      typeIds: [1,2],
      typeList: [{id:1,name:'热点'},{id:2,name:'书签'}]}
    ;
  }

  componentDidMount() {
    const { readActions } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    const { read } = this.props;
    if (
      read.isLoadMore &&
      !nextProps.read.isLoadMore &&
      !nextProps.read.isRefreshing
    ) {
      if (nextProps.read.noMore) {
        ToastUtil.showShort('没有更多数据了');
        const index = this.state.typeIds.indexOf(currentLoadMoreTypeId);
        if (index >= 0) {
          pages[index] -= 1;
        }
      }
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('changeCategory');
  }

  onRefresh = (typeId) => {
    // const { readActions } = this.props;
    // readActions.requestArticleList(true, false, typeId);
    // const index = this.state.typeIds.indexOf(typeId);
    // if (index >= 0) {
    //   pages[index] = 1;
    // }
  };

  onPress = (article) => {
    const { navigate } = this.props.navigation;
    navigate('Web', { article });
  };

  onIconClicked = () => {
    this.drawer.openDrawer();
  };

  onEndReached = (typeId) => {
    // currentLoadMoreTypeId = typeId;
    // const time = Date.parse(new Date()) / 1000;
    // const index = this.state.typeIds.indexOf(typeId);
    // if (index < 0) {
    //   return;
    // }
    // if (time - loadMoreTime > 1) {
    //   pages[index] += 1;
    //   const { readActions } = this.props;
    //   readActions.requestArticleList(false, false, typeId, true, pages[index]);
    //   loadMoreTime = Date.parse(new Date()) / 1000;
    // }
  };
  renderFooter = () => {
    const { read } = this.props;
    return read.isLoadMore ? <Footer /> : <View />;
  };

  renderItem = article => {
      console.log('art', article);
      return (<ItemCell article={article} onPressHandler={this.onPress} />);
  };

  renderContent = (dataSource, typeId) => {
    console.log('dataSource',dataSource);
    const { read } = this.props;
    // if (read.loading) {
    //   return <LoadingView />;
    // }
    // const isEmpty =
    //   read.articleList[typeId] === undefined ||
    //   read.articleList[typeId].length === 0;
    // if (isEmpty) {
    //   return (
    //     <EmptyView read={read} typeId={typeId} onRefresh={this.onRefresh} />
    //   );
    // }
    return (
      <ItemListView
        dataSource={dataSource}
        typeId={typeId}
        isRefreshing={read.isRefreshing}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        renderFooter={this.renderFooter}
        renderItem={this.renderItem}
      />
    );
  };




  render() {
      const query = gql`
      query NewsQuery {
      news{
        title
        content
        headImg
        author
        meta{
            createdAt
        }
      }
    }
    `
      const ViewWithData = graphql(query, {
        options: {  }
      })((data)=>{
          return (
              <View>
                  {this.renderContent(this.state.dataSource.cloneWithRows(data.data.news?data.data.news:[]),1)}
              </View>
          );
      })
    return (
      <SafeAreaView style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => (
            <ScrollableTabBar
              tabStyle={styles.tab}
              textStyle={styles.tabText}
            />
          )}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor="#3e9ce9"
          tabBarInactiveTextColor="#aaaaaa"
        >
          {/*{content}*/}
          {/*<ViewWithData/>*/}
          {/*<ReadList/>*/}
            <ViewWithData/>
        </ScrollableTabView>
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
    backgroundColor: '#fff'
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerTitleContent: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e9ce9'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2
  }
});

Main.propTypes = propTypes;

export default Main;
