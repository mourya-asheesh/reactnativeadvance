import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {View, Text } from 'react-native';

export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}