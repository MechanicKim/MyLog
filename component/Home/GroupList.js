import React from 'react';
import styled from 'styled-components/native';

const List = styled.View`
  padding-horizontal: 17px;
`;

const Item = styled.TouchableOpacity`
  padding-vertical: 17px;
`;

const Text = styled.Text`
  color: #212121;
  font-size: 20px;
  font-family: 'GamjaFlower-Regular';
`;

export default function GroupList({items, select}) {
  return (
    <List>
      {items.map((item, i) => {
        return (
          <Item key={i} activeOpacity={0.7} onPress={() => select(item)}>
            <Text>{item.title}</Text>
          </Item>
        );
      })}
    </List>
  );
}
