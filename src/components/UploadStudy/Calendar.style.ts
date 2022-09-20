import styled from '@emotion/styled';
import COLOR from '../../constants/colors';

const WrapCalendar = styled.div`
  .react-datepicker-popper {
    width: 20rem;
    .react-datepicker {
      position: absolute;
      left: 50%;
      transform: translate(-40%);
      overflow: hidden;
    }
  }
`;

const CalendarInput = styled.input`
  width: 10rem;
  height: 38px;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export { WrapCalendar, CalendarInput };
