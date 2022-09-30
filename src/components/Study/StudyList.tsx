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
import StudyComponent from './StudyComponent';

const StudyList = () => {
  const { data } = getStudyListQuery();

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

  return (
    <>
      {/* {Array.isArray(data) &&
        data.map((list) => (
          <StudyComponent
            key={list.id}
            id={list.id}
            techs={list.techStacks}
            deadline={list.deadline}
            title={list.title}
            author={list.member.nickname}
          />
        ))} */}
    </>
  );
};

export default StudyList;
