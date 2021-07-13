import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';

const Content = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${props =>
    props.selected ? '#f5f5f5' : 'rgb(255, 255, 255)'};
`;

const Date = styled.Text`
  margin-bottom: 3px;
  font-size: 15px;
  color: #424242;
  font-family: 'GamjaFlower-Regular';
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function Log({log, item, select}) {
  return (
    <Content
      onPress={() => select(item)}
      selected={log && item.id === log.id}
      activeOpacity={1}>
      <Date>{`${moment(item.id).format('YYYY년 M월 D일')} ${item.time}`}</Date>
      <Text>{item.content}</Text>
    </Content>
  );
}
