import React from 'react';
import styled from 'styled-components/native';

const Group = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-vertical: 10px;
  background-color: rgb(245, 223, 77);
  background-color: #e0e0e0;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function Control({prev, next}) {
  return (
    <Group>
      <Button onPress={prev} activeOpacity={1}>
        <Text>이전</Text>
      </Button>
      <Button onPress={next} activeOpacity={1}>
        <Text>다음</Text>
      </Button>
    </Group>
  );
}
