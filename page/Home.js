import React from 'react';
import {Alert, StatusBar} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {getLog, setLog, removeLog} from '../component/Storage';
import {timeID} from '../component/Util';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';

import Header from '../component/Home/Header';
import Control from '../component/Home/Control';
import Form from '../component/Home/Form';

const Page = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Text = styled.Text`
  font-size: 20px;
  color: #212121;
  font-family: 'GamjaFlower-Regular';
`;

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

const ExtendedView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const ExtendedMenu = styled.TouchableOpacity`
  width: 75px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  background-color: rgb(245, 223, 77);
`;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      today: {
        id: '',
        logs: [],
      },
      index: -1,
      content: '',
    };
  }

  async componentDidMount() {
    this.reload(this.props.match.params.current);
  }

  reload = async current => {
    const date = current ? moment(current, 'YYYY-MM-DD') : this.state.date;
    const ymd = date.format('YYYY.MM.DD');
    this.setState({
      date,
      today: (await getLog(ymd)) || {
        id: ymd,
        logs: [],
      },
    });
  };

  render() {
    const {date, today, index, content} = this.state;

    return (
      <Page>
        <StatusBar barStyle="dark-content" />
        <Header history={this.props.history} date={date} />
        <SwipeListView
          data={today.logs.map((s, i) => {
            s.key = i;
            return s;
          })}
          renderItem={(data, rowMap) => (
            <Content
              onPress={() =>
                this.selectContent(data.item.key, data.item.content)
              }
              selected={data.item.key === index}
              activeOpacity={1}>
              <Date>{`${data.item.time}`}</Date>
              <Text>{data.item.content}</Text>
            </Content>
          )}
          renderHiddenItem={(data, rowMap) => (
            <ExtendedView>
              <ExtendedMenu
                onPress={() => this.remove(data.item.key, rowMap)}
                activeOpacity={0.7}>
                <Text>삭제</Text>
              </ExtendedMenu>
            </ExtendedView>
          )}
          rightOpenValue={-76}
          recalculateHiddenLayout={true}
        />
        <Control prev={this.prev} next={this.next} />
        <Form
          index={index}
          content={content}
          write={this.write}
          update={this.update}
        />
      </Page>
    );
  }

  selectContent = (i, content) => {
    let {index} = this.state;

    if (i === index) {
      this.setState({index: -1, content: ''});
    } else {
      this.setState({index: i, content});
    }
  };

  write = content => {
    let {today} = this.state;
    today.logs.unshift({
      ...timeID(),
      content,
    });
    setLog(today);
    this.setState({today, content: ''});
  };

  update = content => {
    let {today, index} = this.state;
    today.logs[index].content = content;
    setLog(today);
    this.setState({today, index: -1, content: ''});
  };

  remove = (index, map) => {
    let {today} = this.state;

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
          onPress: () => {
            map[index].closeRow();
            today.logs.splice(index, 1);

            if (today.logs.length === 0) {
              removeLog(today.id);
              this.setState({
                today: {id: today.id, logs: []},
                index: -1,
                content: '',
              });
            } else {
              setLog(today);
              this.setState({today, index: -1, content: ''});
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  prev = async () => {
    this.state.date.add(-1, 'days');
    this.reload(this.state.date.format('YYYY-MM-DD'));
  };

  next = async () => {
    this.state.date.add(1, 'days');
    this.reload(this.state.date.format('YYYY-MM-DD'));
  };

  openDatepicker = () => {
    const {date} = this.state;
    this.props.history.push(`/calendar/${date.format('YYYY-MM-DD')}`);
  };
}

export default Home;
