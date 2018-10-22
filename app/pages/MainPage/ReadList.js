import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

function NewsApp(data) {
    return (
        <View>
            {data.data.news && data.data.news.map(({ title, content }) => (
                <Text>Name: {title}</Text>
            ))}
        </View>
    );
}

export default graphql(gql`
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
    `)(NewsApp);