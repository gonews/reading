
import React from 'react';
import { StyleSheet, Image, Text, Linking, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
// import { Query } from "react-apollo";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

class About extends React.Component {
  static navigationOptions = {
      title: '书签',
      tabBarIcon: ({ tintColor }) => (
          <Icon name="md-pricetags" size={25} color={tintColor} />
      )
  };

  ExchangeRates = () => (
    <Query
        query={gql`
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
    `}
    >
        {({ loading, error, data }) => {
          console.log('ddddd',data);
          return (
          <View >
                  <Text>{data.title}</Text>
                 </View>);


        }}
    </Query>
);

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

      const President = ({ data }) => (

          <View style={{paddingLeft: 20, paddingTop: 20}}>
            <Text>Name: {data.news.title}</Text>
          </View>
      )

      const ViewWithData = graphql(query, {
          options: { }
      })(President)
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>书签页面1</Text>
            {ViewWithData}
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
