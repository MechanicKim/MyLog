import React from 'react';
import {Alert, Keyboard} from 'react-native';
import styled from 'styled-components/native';

const Group = styled.View`
  flex-direction: row;
`;

const InputScroll = styled.ScrollView`
  height: 100px;
`;

const Input = styled.TextInput`
  height: 100px;
  flex: 1;
  padding: 10px;
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

const Button = styled.TouchableOpacity`
  width: 75px;
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgb(245, 223, 77);
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({content: this.props.content});
    }
  }

  render() {
    const {content} = this.state;
    const {index, write, update} = this.props;

    return (
      <Group>
        <InputScroll>
          <Input
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={this.onChangeContent}
            placeholder="여기에 써주세요."
          />
        </InputScroll>
        {index === -1 && (
          <Button
            onPress={() => {
              if (this.validateContent()) {
                write(content);
              }
            }}
            activeOpacity={1}>
            <Text>쓰기</Text>
          </Button>
        )}
        {index > -1 && (
          <Button
            onPress={() => {
              if (this.validateContent()) {
                update(content);
              }
            }}
            activeOpacity={1}>
            <Text>수정</Text>
          </Button>
        )}
      </Group>
    );
  }

  onChangeContent = content => {
    this.setState({content});
  };

  validateContent = () => {
    if (!this.state.content) {
      Alert.alert('', '내용을 입력해 주세요.', [{text: '확인'}]);
      return false;
    }
    Keyboard.dismiss();
    this.setState({content: ''});
    return true;
  };
}
