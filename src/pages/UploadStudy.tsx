import Editor from '../components/UploadStudy/Editor';
import Footer from '../components/UploadStudy/Footer';
import WrapSection from '../components/UploadStudy/WrapSection';
import SelectContainer from '../components/UploadStudy/SelectContainer';
import useInput from 'src/hooks/useInput';

const UploadStudy = () => {
  const { form, changeInput, selectChange, datePickerChange, multiSelectChange, editorChange } =
    useInput({
      offline: true,
      personnel: '',
      status: 'RECRUITING',
      deadline: '',
      techStackIds: [],
      content: '',
      title: '',
    });

  return (
    <>
      <WrapSection>
        <SelectContainer
          changeInput={changeInput}
          selectChange={selectChange}
          datePickerChange={datePickerChange}
          multiSelectChange={multiSelectChange}
        />
        <Editor editorChange={editorChange} changeInput={changeInput} />
        <Footer form={form} />
      </WrapSection>
    </>
  );
};

export default UploadStudy;
