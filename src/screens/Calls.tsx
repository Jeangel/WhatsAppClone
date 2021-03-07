import * as React from 'react';
import { Text as RNText, View } from 'react-native';
import { Text } from '../components/atoms/Text';

export const Calls = () => {
  return (
    <View>
      <RNText>Calls</RNText>
      <Text variant="body" color="danger">
        Calls
      </Text>
    </View>
  );
};
