import React from 'react';
import styled from 'styled-components/native';

const Title = styled.View`
  padding: 17px;
  border-bottom-width: 1px;
  border-bottom-color: #bdbdbd;
`;

const Text = styled.Text`
  color: #212121;
  font-size: 17px;
  font-weight: bold;
`;

export default function GroupTitle({title}) {
  return (
    <Title>
      <Text>{title}</Text>
    </Title>
  );
}
