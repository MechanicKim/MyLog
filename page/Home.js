import React from 'react';
import styled from 'styled-components/native';

import Group from '../component/Home/Group';

const Page = styled.SafeAreaView`
  flex: 1;
`;

const Scroll = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const menuList = [
  {
    title: '소소한 하루의 일상',
    no: 1,
    items: [
      {
        title: '가장 안 좋았던',
        key: 'unhappy',
      },
      {
        title: '가장 좋았던',
        key: 'happy',
      },
      {
        title: '감사했던',
        key: 'thanks',
      },
    ],
  },
  {
    title: '이루고 싶은 꿈, 소망',
    no: 2,
    items: [
      {
        title: '하고 싶은',
        key: 'hopeToDo',
      },
      {
        title: '갖고 싶은',
        key: 'hopeToHave',
      },
      {
        title: '되고 싶은',
        key: 'hopeToBe',
      },
      {
        title: '기도',
        key: 'pray',
      },
    ],
  },
];

export default function Home({history}) {
  return (
    <Page>
      <Scroll>
        {menuList.map(menu => {
          return <Group key={menu.no} menu={menu} history={history} />;
        })}
      </Scroll>
    </Page>
  );
}
