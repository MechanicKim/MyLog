import React from 'react';
import styled from 'styled-components/native';

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  width: 75px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  background-color: rgb(245, 223, 77);
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function ExtendedMenu({remove}) {
  return (
    <Wrap>
      <Button activeOpacity={0.7} onPress={remove}>
        <Text>삭제</Text>
      </Button>
    </Wrap>
  );
}
