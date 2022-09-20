import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

const CustonDatePicker = ({ date, decreaseMonth, increaseMonth }: any) => {
  return (
    <div className="flex justify-between items-center pt-4 px-10 gap-4">
      <div className="datepickerHeader">
        <div onClick={decreaseMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div>{date.toDateString()}</div>
        <div onClick={increaseMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <button className="w-1/2 bg-gray-point py-2 rounded-md text-white">취소</button>
      <button className="w-1/2 bg-yellow-point py-2 rounded-md text-gray-600">확인</button>
    </div>
  );
};

export default CustonDatePicker;
