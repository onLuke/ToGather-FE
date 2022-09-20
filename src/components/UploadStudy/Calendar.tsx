import React from 'react';
import { WrapCalendar, CalendarInput } from './Calendar.style';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { CalendarContainer } from 'react-datepicker';
import styled from '@emotion/styled';

const PopUp = styled.div``;

interface iProps {
  selected: Date;
  startDateDispatch: React.Dispatch<React.SetStateAction<Date>>;
  datePickerChangeDispatch: (date: Date) => void;
}

const Calendar = (props: iProps) => {
  const { selected, startDateDispatch, datePickerChangeDispatch } = props;

  const handleOnChange = () => {
    startDateDispatch(selected);
    datePickerChangeDispatch(selected);
  };

  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => {
    return (
      <WrapCalendar>
        <CalendarContainer className={className}>{children}</CalendarContainer>
      </WrapCalendar>
    );
  };

  const MyContainer2 = ({ className, children }: { [key: string]: any }) => {
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
        onChange={handleOnChange}
        selected={selected}
        calendarContainer={MyContainer2}
        customInput={<CalendarInput />}
        minDate={selected}
        placeholderText={'모집마감일'}
        showPopperArrow={false}
      ></DatePicker>
    </WrapCalendar>
  );
};

export default Calendar;
