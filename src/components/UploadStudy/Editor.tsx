import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../constants/EditorFormat';
import { WrapEditor, ContentHeading, Input } from './Editor.style';

interface iProps {
  editorChange: (value: string) => void;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor = (props: iProps) => {
  const { editorChange, changeInput } = props;

  return (
    <>
      <WrapEditor>
        <ContentHeading>공고 내용 작성하기</ContentHeading>
        <Input placeholder={'공고 제목'} name="title" onChange={changeInput}></Input>
        <ReactQuill
          onChange={editorChange}
          placeholder={'공고 내용을 입력해주세요'}
          theme="snow"
          modules={modules}
          formats={formats}
        ></ReactQuill>
      </WrapEditor>
    </>
  );
};

export default Editor;
