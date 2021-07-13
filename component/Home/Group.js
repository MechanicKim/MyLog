import React from 'react';
import styled from 'styled-components/native';

import GroupTitle from './GroupTitle';
import GroupList from './GroupList';

const Wrap = styled.View`
  margin-bottom: 10px;
`;

export default function Group({menu, history}) {
  return (
    <Wrap key={menu.no}>
      <GroupTitle title={menu.title} />
      <GroupList
        items={menu.items}
        select={item => history.push('/log', item)}
      />
    </Wrap>
  );
}
