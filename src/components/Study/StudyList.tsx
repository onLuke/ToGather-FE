import {
  Study,
  StudyDeadline,
  StudyTitle,
  StudyFooter,
  StudyAuthor,
  StudyViewer,
} from './StudyList.style';
import Studytechs from './StudyTechs';
import { QueryCache } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageNumber, isRecruiting, isUploaded } from '../../contexts/chachingOptionAtom';
import { useState } from 'react';
import { getStudyListQuery } from '../../service/studyQuery';
import { ProjectDetailAtom } from 'src/contexts/ProjectDetailAtom';

const StudyList = () => {
  const { data } = getStudyListQuery();
  const setProjectDetail = useSetRecoilState(ProjectDetailAtom);

  const handleStudyClick = (nickname: string, id: number, url: string) => {
    setProjectDetail({ author: nickname, projectId: id, imageUrl: url });
  };

  /*   const query = queryCache.find(['getStudyList', pageNum]);

  console.log(query);

  const { isLoading, data, isFetching } = useQuery(
    ['getStudyList', pageNum],
    async () => {
      const data = await getStudy(pageNum, recruitState);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: reFetchOption ? 0 : 5 * 60 * 1000,
      onSuccess: (dataset) => {
        console.log('inUseQuery');
        console.log(data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    }
  ); */

  console.log('isArray?');
  console.log(data);
  return (
    <>
      {Array.isArray(data) &&
        data.map((list) => (
          <StudyComponent
            id={list.id}
            techs={list.techs}
            deadline={list.deadline}
            title={list.search.title}
            author={list.search.author}
          />
          // <Study key={list.id} to="/">
          //   <Studytechs techsList={list.techs} />
          //   <StudyDeadline>
          //     마감 예정일
          //     <span aria-hidden="true">|</span>
          //     {list.deadline}
          //   </StudyDeadline>
          //   <StudyTitle>{list.search.title}</StudyTitle>
          //   <StudyFooter>
          //     <StudyAuthor>
          //       <img src="/" width="36px" height="36px" />
          //       {list.search.author}
          //     </StudyAuthor>
          //     <StudyViewer>viewerArea</StudyViewer>
          //   </StudyFooter>
          // </Study>
        ))}
    </>
  );
};

export default StudyList;
