import Editor from '../components/UploadStudy/Editor';
import Footer from '../components/UploadStudy/Footer';
import WrapSection from '../components/UploadStudy/WrapSection';
import SelectContainer from '../components/UploadStudy/SelectContainer';
import useInputForUpload from '../hooks/useInputForUpload';
import { useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export interface uploadType {
  id: string;
  title: string;
  personnel: string;
  deadline: string;
  offline: string;
  techStacks: any[];
  content: string;
  edit: boolean;
}

const UploadStudy = () => {
  const location = useLocation();

  const locationCallback = useCallback(() => {
    if (location.state) {
      const state = location.state as {
        id: string;
        title: string;
        personnel: string;
        deadline: string;
        offline: string;
        techStacks: any[];
        content: string;
        edit: boolean;
      };
      const isEdit = state.edit;

      const techIds = useMemo(() => {
        let ids = [];
        for (let el of state.techStacks) {
          ids.push(el.id);
        }
        return ids;
      }, [state.techStacks]);

      return {
        initialValue: {
          offline: state.offline === 'true' ? true : false,
          personnel: state.personnel,
          status: 'RECRUITING',
          deadline: state.deadline,
          techStackIds: techIds,
          title: state.title,
          content: state.content,
        },
        isEdit: isEdit,
        id: state.id,
      };
    } else
      return {
        initialValue: {
          offline: true,
          personnel: '',
          status: 'RECRUITING',
          deadline: '',
          techStackIds: [],
          title: '',
          content: '',
        },
        isEdit: false,
        id: null,
      };
  }, []);

  const {
    form,
    changeInputWithCheck,
    selectChangeWithCheck,
    datePickerChange,
    multiSelectUpload,
    editorChange,
  } = useInputForUpload(locationCallback().initialValue);

  const Selectors = useMemo(() => {
    return {
      offline: form.offline,
      personnel: form.personnel,
      deadline: form.deadline,
      techStackIds: form.techStackIds,
    };
  }, [form]);

  const editors = useMemo(() => {
    return { title: form.title, content: form.content };
  }, [form]);

  return (
    <>
      <WrapSection>
        <SelectContainer
          isEdit={locationCallback().isEdit}
          form={Selectors}
          changeInput={changeInputWithCheck}
          selectChange={selectChangeWithCheck}
          datePickerChange={datePickerChange}
          multiSelectChange={multiSelectUpload}
        />
        <Editor
          isEdit={locationCallback().isEdit}
          editorChange={editorChange}
          changeInput={changeInputWithCheck}
          form={editors}
        />
        <Footer isEdit={locationCallback().isEdit} form={form} id={locationCallback().id} />
      </WrapSection>
    </>
  );
};

export default UploadStudy;
