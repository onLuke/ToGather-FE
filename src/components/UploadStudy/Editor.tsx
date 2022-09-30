import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
import { formats, modules } from '../../constants/EditorFormat';
import { WrapEditor, ContentHeading, Input } from './Editor.style';
import { WarnBox } from './SelectContainer.style';

interface iProps {
  editorChange: (value: string) => void;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor = (props: iProps) => {
  const { editorChange, changeInput } = props;
  const [option, setOption] = useRecoilState(NeedValueAtom);

  const handleBlurInput = (e: React.FocusEvent<any>) => {
    if (!e.target.value) setOption({ ...option, title: true });
    else setOption({ ...option, title: false });
  };

  const handleContent = (e: any) => {
    if (e.index === 0) setOption({ ...option, content: true });
    else setOption({ ...option, content: false });
  };
  return (
    <>
      <WrapEditor>
        <ContentHeading>공고 내용 작성하기</ContentHeading>
        <Input
          placeholder={'공고 제목'}
          name="title"
          onChange={changeInput}
          onBlur={handleBlurInput}
          className="title_input"
        ></Input>
        <WarnBox isHidden={option.title}>공고 제목을 입력해주세요</WarnBox>
        <ReactQuill
          onChange={(e: any) => {
            editorChange(e);
            handleContent(e);
          }}
          placeholder={'공고 내용을 입력해주세요'}
          theme="snow"
          modules={modules}
          formats={formats}
          style={{ marginBottom: '3rem' }}
        ></ReactQuill>
        <WarnBox isHidden={option.content}>공고 내용을 입력해주세요</WarnBox>
      </WrapEditor>
    </>
  );
};

export default Editor;
