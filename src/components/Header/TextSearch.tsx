import {
  WrapSearch,
  SelectCategory,
  Options,
  WrapInput,
  SearchInput,
  Btn,
} from './TextSearch.style';
import { TextFilterAtom } from 'src/contexts/FilterOptionAtom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';

interface iProps {
  textIsOpen: boolean;
  isHidden: boolean;
}
const TextSearch = () => {
  const [value, setValue] = useState('');
  const [option, setOption] = useRecoilState(TextFilterAtom);
  const resetFilter = useResetRecoilState(TextFilterAtom);
  const [placeHolder, setPlaceHolder] = useState('제목으로');

  const handleBtn = () => {
    switch (placeHolder) {
      case '제목으로':
        resetFilter();
        setOption({ content: null, author: null, title: value });
        break;
      case '내용으로':
        setOption({ title: null, author: null, content: value });
        break;
      case '작성자로':
        setOption({ title: null, content: null, author: value });
        break;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'title':
        setPlaceHolder('제목으로');
        break;
      case 'content':
        setPlaceHolder('내용으로');
        break;
      case 'author':
        setPlaceHolder('작성자로');
        break;
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBtn();
  };

  return (
    <WrapSearch onChange={handleSelect}>
      <SelectCategory>
        <Options value="title">제목</Options>
        <Options value="content">내용</Options>
        <Options value="author">작성자</Options>
      </SelectCategory>
      <WrapInput>
        <SearchInput
          value={value}
          placeholder={`${placeHolder} 검색하기`}
          onChange={handleOnChange}
          onKeyPress={handleEnter}
        ></SearchInput>
        <Btn onClick={handleBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </Btn>
      </WrapInput>
    </WrapSearch>
  );
};

export default TextSearch;
