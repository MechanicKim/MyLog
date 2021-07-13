/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
import {BackButton} from 'react-router-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {loadLog, saveLog} from '../component/Storage';
import {timeID} from '../component/Util';
import styled from 'styled-components/native';

import Header from '../component/MyLog/Header';
import Log from '../component/MyLog/Log';
import Form from '../component/MyLog/Form';
import ExtendedMenu from '../component/MyLog/ExtendedMenu';

const Page = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
`;

export default function MyLog({
  history: {
    location: {state},
  },
}) {
  const [logs, setLogs] = useState([]);
  const [log, setLog] = useState(null);

  useEffect(() => {
    getLog();
  }, []);

  async function getLog() {
    setLogs(await loadLog(state.key));
  }

  function selectLog(selectedLog) {
    if (!log) {
      setLog(selectedLog);
      return;
    }

    if (log.id === selectedLog.id) {
      setLog(null);
    } else {
      setLog(selectedLog);
    }
  }

  function remove(target, rowMap) {
    Alert.alert(
      '확인',
      '선택한 기록을 삭제할까요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: async () => {
            rowMap[target.key].closeRow();
            await saveLog(
              state.key,
              logs.filter(l => {
                return l.id !== target.id;
              }),
            );

            setLogs(await loadLog(state.key));
          },
        },
      ],
      {cancelable: true},
    );
  }

  async function write(content) {
    await saveLog(state.key, [
      {
        ...timeID(),
        content,
      },
      ...logs,
    ]);

    setLogs(await loadLog(state.key));
  }

  async function update(content) {
    await saveLog(
      state.key,
      logs.map(l => {
        if (l.id === log.id) {
          return {
            ...l,
            content,
          };
        } else {
          return l;
        }
      }),
    );

    setLog(null);
    setLogs(await loadLog(state.key));
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <BackButton />
      <Header title={state.title} />
      <SwipeListView
        data={logs.map((l, i) => ({
          ...l,
          key: i,
        }))}
        renderItem={({item}) => (
          <Log log={log} item={item} select={selectLog} />
        )}
        renderHiddenItem={({item}, rowMap) => (
          <ExtendedMenu item={item} remove={() => remove(item, rowMap)} />
        )}
        rightOpenValue={-76}
        recalculateHiddenLayout={true}
      />
      <Form log={log} write={write} update={update} />
    </Page>
  );
}
