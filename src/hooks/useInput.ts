import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
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
  const [option, setOption] = useRecoilState(NeedValueAtom);

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

    const dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${dayString}`;
    setForm({ ...form, deadline: dateValue });
  };

  const editorChange = (value: string) => {
    setForm({ ...form, content: value });
  };

  return {
    form,
    changeInput,
    selectChange,
    multiSelectChange,
    datePickerChange,
    editorChange,
    idNameToMultiSelect,
  };
};

export default useInput;
