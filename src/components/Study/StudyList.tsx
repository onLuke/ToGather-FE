import { WrapStudy } from './StudyList.style';
import Studytechs from './StudyTechs';
import { QueryCache, useInfiniteQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageNumber, isRecruiting, isUploaded } from '../../contexts/chachingOptionAtom';
import { useEffect, useState } from 'react';
import StudyComponent from './StudyComponent';
import { TechFilterSelector, TitleFilterAtom } from 'src/contexts/FilterOptionAtom';
import { getStudy } from 'src/apis/study';
import React from 'react';
import { CheckInfinity } from './StudyContainer.style';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Api from 'src/apis/Api';
import { Link } from 'react-router-dom';

const StudyList = () => {
  const recruitState = useRecoilValue(isRecruiting);
  const techIds = useRecoilValue(TechFilterSelector);
  const title = useRecoilValue(TitleFilterAtom);

  const fetchPostList = async (
    recruitState: string,
    techIds: string[] | null,
    title: string | null,
    pageParam: number
  ) => {
    const res = await Api.get(
      `https://dokuny.blog/projects?limit=9&pageNumber=${pageParam}&status=${recruitState}${
        techIds !== null ? '&techStackIds=' + techIds.join(',') : ''
      }${title !== null ? '&title=' + title : ''}`
    );
    const { data } = res;
    const isLast = res.data.length === 0 ? true : false;
    return { data, nextPage: pageParam + 1, isLast };
  };

  const { ref, inView } = useInView();
  let { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts', recruitState, techIds, title],
    ({ pageParam = 0 }) => fetchPostList(recruitState, techIds, title, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <WrapStudy className="study">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((list: any) => (
              <StudyComponent
                key={list.id}
                id={list.id}
                techs={list.techStacks}
                deadline={list.deadline}
                title={list.title}
                author={list.member.nickname}
              />
            ))}
          </React.Fragment>
        ))}
      </WrapStudy>
      <CheckInfinity ref={ref} className="check" />
    </>
  );
};

export default StudyList;
