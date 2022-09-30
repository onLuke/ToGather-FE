import Editor from '../components/UploadStudy/Editor';
import Footer from '../components/UploadStudy/Footer';
import WrapSection from '../components/UploadStudy/WrapSection';
import SelectContainer from '../components/UploadStudy/SelectContainer';
import useInputForUpload from '../hooks/useInputForUpload';
import { useRef } from 'react';

export interface inputFormType {
  offline: boolean;
  personnel: string;
  status: string;
  deadline: string;
  techStackIds: number[];
  content: string;
  title: string;
  Location: string;
}

const UploadStudy = () => {
  const {
    form,
    changeInputWithCheck,
    selectChangeWithCheck,
    datePickerChange,
    multiSelectUpload,
    editorChange,
  } = useInputForUpload({
    offline: true,
    personnel: '',
    status: 'RECRUITING',
    deadline: '',
    techStackIds: [],
    title: '',
    content: '',
  });

  return (
    <>
      <WrapSection>
        <SelectContainer
          changeInput={changeInputWithCheck}
          selectChange={selectChangeWithCheck}
          datePickerChange={datePickerChange}
          multiSelectChange={multiSelectUpload}
        />
        <Editor editorChange={editorChange} changeInput={changeInputWithCheck} />
        <Footer form={form} />
      </WrapSection>
    </>
  );
};

export default UploadStudy;
