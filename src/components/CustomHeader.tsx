// CustomHeader.js
import React from 'react';
import { View, Text } from 'react-native';

const CustomHeader = ({ email }: any) => (
  <View
    style={{
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgray',
    }}
  >
    <Text>User: {email}</Text>
  </View>
);

export default CustomHeader;
