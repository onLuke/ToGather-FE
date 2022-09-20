import React, { useState } from 'react';

const useInput = (initailValue: any) => {
  const [form, setForm] = useState(initailValue);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const selectChange = (targetValue: any, targetName: any) => {
    const { name } = targetName;
    const { value } = targetValue;
    setForm({ ...form, [name]: value });
  };

  const multiSelectChange = (targetValue: any, targetAction: any) => {
    const { action, name } = targetAction;
    if (action === 'clear') {
      setForm({ ...form, [name]: [] });
    } else if (action === 'remove-value') {
      const filterdData = form[name].filter(
        (item: number) => item != targetAction.removedValue.value
      );
      setForm({ ...form, [name]: filterdData });
    } else {
      for (let item of targetValue) {
        let { value } = item;
        setForm({ ...form, [name]: [...form[name], value] });
      }
    }
  };

  const datePickerChange = (date: Date) => {
    const name = 'deadline';
    const dateValue = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    setForm({ ...form, [name]: dateValue });
  };

  return { form, changeInput, selectChange, multiSelectChange, datePickerChange };
};

export default useInput;
