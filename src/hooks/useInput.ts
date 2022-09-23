import React, { useEffect, useState } from 'react';

interface data {
  [key: string]: any;
}
const useInput = (initailValue: any) => {
  const [form, setForm] = useState<data>({});

  useEffect(() => {
    setForm(initailValue);
  }, []);

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
      debugger;
      for (let item of targetValue) {
        let { value } = item;
        setForm({ ...form, [name]: [...form[name]] });
      }
    }
  };

  const datePickerChange = (date: Date) => {
    const name = 'deadline';
    const dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    setForm({ ...form, deadline: dateValue });
  };

  const editorChange = (value: string) => {
    setForm({ ...form, content: value });
  };

  return { form, changeInput, selectChange, multiSelectChange, datePickerChange, editorChange };
};

export default useInput;
