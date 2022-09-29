import React, { useEffect, useState } from 'react';
import S3UploadImage from './useS3UploadImage';

interface Data {
  [key: string]: any;
}

interface Tech {
  value: number;
  label: string;
}

const useInput = (initailValue: any) => {
  const [form, setForm] = useState(initailValue);

  useEffect(() => {
    setForm(initailValue);
  }, [initailValue.nickname, initailValue.profileImage]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.files) {
      setForm({ ...form, [name]: URL.createObjectURL(e.target.files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
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
        (item: Tech) => item.value != targetAction.removedValue.value
      );
      setForm({ ...form, [name]: filterdData });
    } else {
      for (let item of targetValue) {
        setForm({ ...form, [name]: [...targetValue] });
      }
    }
  };

  const idNameToMultiSelect = (target: Tech[]) => {
    const changeProperty = target.reduce((acc: number[], cur: Tech) => {
      let id = cur.value;
      return [...acc, id];
    }, []);
    return changeProperty;
  };

  const datePickerChange = (date: Date) => {
    const dayToString = String(date.getDate());
    const dayString = String(date.getDate()).length < 2 ? '0' + dayToString : dayToString;

    console.log(dayString);

    const dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${dayString}`;
    setForm({ ...form, deadline: dateValue });
  };

  const editorChange = (value: string) => {
    setForm({ ...form, content: value });
  };

  const multiSelectUpload = (targetValue: any, targetAction: any) => {
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

  return {
    form,
    changeInput,
    selectChange,
    multiSelectChange,
    datePickerChange,
    editorChange,
    idNameToMultiSelect,
    multiSelectUpload,
  };
};

export default useInput;
