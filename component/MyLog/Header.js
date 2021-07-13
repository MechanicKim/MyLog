import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  padding: 15px 10px;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function Header({title}) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
