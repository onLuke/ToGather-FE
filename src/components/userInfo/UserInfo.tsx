import React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useInput from 'src/hooks/useInput';
import { position, stacktech } from 'src/mocks/SelectTechs';
import { CancelButton, SubmitButton } from 'src/styles/Button';
import {
  ProfileImageBlock,
  InputBoxBlock,
  InputLabel,
  InputText,
  ProfileArticle,
} from 'src/styles/Input';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { UserInfoBlock, ButtonBlock, Wrapper, TempBlock } from './UserInfo.styles';

const UserInfo = () => {
  const { form, changeInput, multiSelectChange } = useInput({
    profile: '',
    nickname: '',
    techStackDtos: [],
  });

  useEffect(() => {
    // user API 콜
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    debugger;
    e.preventDefault();
    console.log(form);
  };

  const handleUserLeave = (e: React.MouseEvent<HTMLElement>) => {
    console.log('회원탈퇴');
  };
  return (
    <UserInfoBlock>
      <Breadcrumb>마이 페이지 - 내정보</Breadcrumb>
      <Wrapper>
        <InputBoxBlock>
          <InputLabel htmlFor="profile">프로필</InputLabel>
          <ProfileImageBlock>
            <ProfileArticle>
              <img src="/" alt="" />
            </ProfileArticle>
            <InputText
              id="profile"
              name="profile"
              type="file"
              value={form.profile}
              onChange={changeInput}
            />
          </ProfileImageBlock>
        </InputBoxBlock>
        <InputBoxBlock>
          <InputLabel htmlFor="nickname">닉네임</InputLabel>
          <InputText
            id="nickname"
            name="nickname"
            type="text"
            value={form.nickname}
            onChange={changeInput}
          />
        </InputBoxBlock>
        {/* <InputBoxBlock>
            <InputLabel htmlFor="position">포지션</InputLabel>
            <Select
              className="customSelect"
              defaultValue={position[0]}
              id="position"
              name="position"
              placeholder="포지션"
              options={position}
            />
          </InputBoxBlock> */}
        <InputBoxBlock>
          <InputLabel htmlFor="tech">기술 태그</InputLabel>
          <CreatableSelect
            isClearable
            isMulti
            id="techStackDtos"
            className="customSelect"
            name="techStackDtos"
            placeholder="기술 태그"
            options={stacktech}
            onChange={multiSelectChange}
          />
        </InputBoxBlock>
        <InputBoxBlock>
          <InputLabel htmlFor="project">프로젝트 이력</InputLabel>
          <InputText id="project" name="project" type="text" readOnly />
        </InputBoxBlock>
        <InputBoxBlock>
          <InputLabel htmlFor="temp">온도</InputLabel>
          <TempBlock>23</TempBlock>
        </InputBoxBlock>
        <ButtonBlock>
          <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
          <CancelButton onClick={handleUserLeave}>회원탈퇴</CancelButton>
        </ButtonBlock>
      </Wrapper>
    </UserInfoBlock>
  );
};

export default UserInfo;
