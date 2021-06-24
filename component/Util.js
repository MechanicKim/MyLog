import {LocaleConfig} from 'react-native-calendars';
import {getLog} from '../component/Storage';
import moment from 'moment';

export const timeID = () => {
  const now = new Date();
  const h = now.getHours();
  const min = now.getMinutes();

  return {
    id: now.getTime(),
    time: `${h}시 ${min}분`,
  };
};

export const configCalendarLocale = () => {
  LocaleConfig.locales.ko = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  };
  LocaleConfig.defaultLocale = 'ko';
};

export const getMonthlyLog = async date => {
  const current = moment(date, 'YYYY-MM-DD');
  const first = current.clone().startOf('month');
  const days = current.daysInMonth();
  let markedDates = {};
  for (let d = 1; d <= days; d++) {
    first.add(1, 'day');
    const data = await getLog(first.format('YYYY.MM.DD'));

    markedDates[first.format('YYYY-MM-DD')] = {
      marked: data && data.logs.length > 0,
    };
  }
  return {
    current: date,
    markedDates,
  };
};
