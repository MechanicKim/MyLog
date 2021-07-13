/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Alert, Keyboard} from 'react-native';
import styled from 'styled-components/native';

const Group = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InputScroll = styled.ScrollView`
  height: 100px;
`;

const Input = styled.TextInput`
  height: 100px;
  flex: 1;
  padding: 15px;
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  margin-left: 10px;
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 223, 77);
  border-radius: 75px;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default function Form({write, update, log}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (log) {
      setContent(log.content);
    } else {
      setContent('');
    }
  }, [log]);

  function validateContent() {
    if (!content) {
      Alert.alert('', '내용을 입력해 주세요.', [{text: '확인'}]);
      return;
    }

    if (log) {
      update(content);
    } else {
      write(content);
    }

    Keyboard.dismiss();
    setContent('');
  }

  return (
    <Group>
      <InputScroll>
        <Input
          multiline
          textAlignVertical="top"
          value={content}
          onChangeText={text => setContent(text)}
          placeholder="여기에 써주세요."
        />
      </InputScroll>
      <Button onPress={() => validateContent()} activeOpacity={1}>
        <Text>쓰기</Text>
      </Button>
    </Group>
  );
}
