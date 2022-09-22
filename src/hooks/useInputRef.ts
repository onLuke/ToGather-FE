import React, { useRef } from 'react';

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
    console.log('here');

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
        console.log(formRef.current[name]);

        formRef.current[name] = [...new Set([...formRef.current[name], value])];
      }
    }
    console.log(formRef.current);
  };

  const datePickerChange = (date: Date) => {
    const dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    formRef.current.deadline = dateValue;
  };

  const editorChange = (value: string) => {
    formRef.current.content = value;
  };

  return { formRef, changeInput, selectChange, multiSelectChange, datePickerChange, editorChange };
};

export default useInputRef;
