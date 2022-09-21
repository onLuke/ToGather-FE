import React, { useState, useRef } from 'react';

const useInputRef = (initailValue: any) => {
  const formRef = useRef(initailValue);

  const changeInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formRef.current = { ...formRef.current, [name]: value };
  };

  const selectChange = (targetValue: any, targetName: any) => {
    const { name } = targetName;
    const { value } = targetValue;
    formRef.current = { ...formRef.current, [name]: value };
  };

  const multiSelectChange = (targetValue: any, targetAction: any) => {
    const { action, name } = targetAction;

    if (action === 'clear') {
      formRef.current[name] = [];
    } else if (action === 'remove-value') {
      const filterdData = formRef.current[name].filter(
        (item: number) => item != targetAction.removedValue.value
      );
      formRef.current[name] = filterdData;
    } else {
      for (let item of targetValue) {
        let { value } = item;
        formRef.current[name] = formRef.current[name] ? [...formRef.current[name], value] : [value];
      }
    }
  };

  const datePickerChange = (date: Date) => {
    const name = 'deadline';
    const dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    formRef.current[name] = dateValue;
  };

  return { formRef, changeInput, selectChange, multiSelectChange, datePickerChange };
};

export default useInputRef;
