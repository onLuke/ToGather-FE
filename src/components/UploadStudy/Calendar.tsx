import { useState } from 'react';
import { WrapCalendar, CalendarInput } from './Calendar.style';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { CalendarContainer } from 'react-datepicker';
import styled from '@emotion/styled';

const PopUp = styled.div``;

interface iProps {
  datePickerChangeDispatch: (date: Date) => void;
}

const Calendar = (props: iProps) => {
  const { datePickerChangeDispatch } = props;
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleOnChange = (date: Date) => {
    datePickerChangeDispatch(date);
    setStartDate(date);
  };

  const Container = ({ className, children }: { [key: string]: any }) => {
    return (
      <PopUp>
        <CalendarContainer className={className}>
          <div>{children}</div>
        </CalendarContainer>
      </PopUp>
    );
  };

  return (
    <WrapCalendar>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={startDate}
        onChange={handleOnChange}
        calendarContainer={Container}
        customInput={<CalendarInput />}
        minDate={new Date()}
        placeholderText={'모집마감일'}
        showPopperArrow={false}
      ></DatePicker>
    </WrapCalendar>
  );
};

export default Calendar;
