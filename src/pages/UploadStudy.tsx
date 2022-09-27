import Editor from '../components/UploadStudy/Editor';
import Footer from '../components/UploadStudy/Footer';
import WrapSection from '../components/UploadStudy/WrapSection';
import SelectContainer from '../components/UploadStudy/SelectContainer';
import useInput from 'src/hooks/useInput';

export interface inputFormType {
  offline: boolean;
  personnel: string;
  status: string;
  deadline: string;
  techStackIds: number[];
  content: string;
  title: string;
  location: string;
}

const UploadStudy = () => {
  const { form, changeInput, selectChange, datePickerChange, multiSelectUpload, editorChange } =
    useInput({
      offline: true,
      personnel: '',
      status: 'RECRUITING',
      deadline: '',
      techStackIds: [],
      content: '',
      title: '',
      location: '',
    });

  return (
    <>
      <WrapSection>
        <SelectContainer
          changeInput={changeInput}
          selectChange={selectChange}
          datePickerChange={datePickerChange}
          multiSelectChange={multiSelectUpload}
        />
        <Editor editorChange={editorChange} changeInput={changeInput} />
        <Footer form={form} />
      </WrapSection>
    </>
  );
};

export default UploadStudy;
