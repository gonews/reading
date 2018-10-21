
import { StackNavigator, TabNavigator } from 'react-navigation';
import MainContainer from '../containers/MainContainer';
import WebViewPage from '../pages/ItemDetail/WebViewPage';
import About from '../pages/About/About';
import Capital from '../pages/About/CapitalContainer';
import Category from '../pages/About/CategoryContrainer';
import Feed from '../pages/About/FeedContainer';


const TabContainer = TabNavigator(
  {
    Main: { screen: MainContainer },
    Category: { screen: Category },
    Feedback: { screen: Feed },
      Capital: { screen: Capital },
    About: { screen: About }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  }
);

const App = StackNavigator(
  {
    // Splash: { screen: Splash },
      Home: {
          screen: TabContainer,
          navigationOptions: {
              headerLeft: null
          }
      },
    Category: {
      screen: Category,
      navigationOptions: {
        headerLeft: null
      }
    },

    Web: { screen: WebViewPage }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;
