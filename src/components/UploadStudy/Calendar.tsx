import { useState } from 'react';
import { WrapCalendar, CalendarInput } from './Calendar.style';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { CalendarContainer } from 'react-datepicker';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';

const PopUp = styled.div``;

interface iProps {
  datePickerChangeDispatch: (date: Date) => void;
}

const Calendar = (props: iProps) => {
  const { datePickerChangeDispatch } = props;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [option, setOption] = useRecoilState(NeedValueAtom);

  const handleOnChange = (date: Date) => {
    datePickerChangeDispatch(date);
    setStartDate(date);
    if (!date) setOption({ ...option, deadline: true });
    else setOption({ ...option, deadline: false });
  };

  const handleBlurInput = (e: React.FocusEvent<any>) => {
    if (!e.target.value) setOption({ ...option, deadline: true });
    else setOption({ ...option, deadline: false });
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
        className="calendar"
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={startDate}
        onChange={handleOnChange}
        onBlur={handleBlurInput}
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
