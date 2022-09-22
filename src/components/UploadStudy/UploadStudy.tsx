import Editor from './Editor';
import Footer from './Footer';
import WrapSection from './WrapSection';
import SelectContainer from './SelectContainer';
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
