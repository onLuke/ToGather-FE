import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getOwnProjectByToken,
  getOwnProjectToUserList,
  putUserMyProjectEnter,
  putUserMyProjectReject,
} from 'src/apis/project';
import { userAtom } from 'src/contexts/UserAtom';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { MyProjectInner, Title } from '../chat/MyProjectList.stylese';
import { AccordionButton, ArcodionHandleBlock, MyProjectBlock, Wrapper } from './MyProject.styles';
import UserIntoProject from './UserIntoProject';

const MyProject = () => {
  const user = useRecoilValue(userAtom);
  const [project, setProject] = useState([]);
  const [confirmUserList, setConfirmUserList] = useState([]);
  const [confirmProjectId, setconfirmProjectId] = useState('');

  useEffect(() => {
    getOwnProject();
  }, []);

  const getOwnProject = async () => {
    try {
      const response = await getOwnProjectByToken();

      setProject(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getConfirmUserList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    try {
      const response = await getOwnProjectToUserList(id);

      setConfirmUserList(response.data.applicantDtos);
      setconfirmProjectId(response.data.projectId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = e.currentTarget.dataset.userid!;
    const projectId = e.currentTarget.dataset.projectid!;
    const status = confirm('해당 유저를 승인 하시겠습니까?');

    if (status) {
      const response = await putUserMyProjectEnter(projectId, userId);

      const filterdUserList = confirmUserList.filter(
        (item: any) => item.memberId === Number(user.id)
      );
      setConfirmUserList(filterdUserList);
    }
  };

  const handleRefuseUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = e.currentTarget.dataset.userid!;
    const projectId = e.currentTarget.dataset.projectid!;
    const status = confirm('해당 유저를 거절 하시겠습니까?');

    if (status) {
      const response = await putUserMyProjectReject(projectId, userId);
      const filterdUserList = confirmUserList.filter(
        (item: any) => item.memberId === Number(user.id)
      );

      setConfirmUserList(filterdUserList);
    }
  };

  return (
    <MyProjectBlock>
      <Breadcrumb>마이 페이지 - 내 작성글</Breadcrumb>
      <Wrapper>
        {project.length === 0 ? <div>작성한 프로젝트가 없습니다.</div> : <></>}
        {project.map((list: any) => (
          <MyProjectInner key={list.id}>
            <Title to={'/studyDetail/' + list.id}>{list.title}</Title>
            <ArcodionHandleBlock>
              <span>요청인원</span>
              <AccordionButton id={list.id} onClick={getConfirmUserList}>
                ▼
              </AccordionButton>
            </ArcodionHandleBlock>
            <UserIntoProject
              projectId={list.id}
              confirmProjectId={confirmProjectId}
              userInfo={confirmUserList}
              handleEnterUser={handleEnterUser}
              handleRefuseUser={handleRefuseUser}
            />
          </MyProjectInner>
        ))}
      </Wrapper>
    </MyProjectBlock>
  );
};

export default MyProject;
