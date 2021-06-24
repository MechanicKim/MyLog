import React from 'react';
import {StatusBar} from 'react-native';
import {BackButton} from 'react-router-native';
import {Calendar} from 'react-native-calendars';

import {configCalendarLocale, getMonthlyLog} from '../component/Util';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';

const Page = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Empty = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  flex-direction: row;
`;
const FooterButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 17px;
  background-color: #e0e0e0;
`;

const FooterButtonText = styled.Text`
  font-size: 17px;
  text-align: center;
  font-family: 'GamjaFlower-Regular';
`;

class CalendarForm extends React.Component {
  constructor(props) {
    super(props);

    configCalendarLocale();

    const {date} = this.props.match.params;
    this.state = {
      current: moment(date, 'YYYYMMDD').format('YYYY-MM-DD'),
      markedDates: {},
    };
  }

  async componentDidMount() {
    this.reload(this.props.match.params.date);
  }

  reload = async date => {
    this.setState(await getMonthlyLog(date));
  };

  render() {
    const {current, markedDates} = this.state;

    return (
      <Page>
        <StatusBar barStyle="dark-content" />
        <BackButton />
        <Calendar
          monthFormat="yyyy년 M월"
          current={current}
          markedDates={markedDates}
          onDayPress={this.selectDay}
          onMonthChange={this.onChangeMonth}
        />
        <Empty />
        <Footer>
          <FooterButton
            onPress={() => this.props.history.goBack()}
            activeOpacity={0.7}>
            <FooterButtonText>목록</FooterButtonText>
          </FooterButton>
        </Footer>
      </Page>
    );
  }

  selectDay = day => {
    this.props.history.replace(`/log/${day.dateString}`);
  };

  onChangeMonth = month => {
    this.reload(month.dateString);
  };
}

export default CalendarForm;
