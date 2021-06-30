import React from 'react';
import styled from 'styled-components/native';

const View = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  background-color: #e0e0e0;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function Header({history, date}) {
  return (
    <View
      onPress={() => {
        history.push(`/calendar/${date.format('YYYY-MM-DD')}`);
      }}
      activeOpacity={0.7}>
      <Text>{date.format('YYYY년 M월 D일 (ddd)')}</Text>
    </View>
  );
}
