import { WrapStudy } from './StudyList.style';
import { useInfiniteQuery, useQueries, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import StudyComponent from './StudyComponent';
import {
  TechFilterSelector,
  TextFilterAtom,
  StatusFilterAtom,
  LocationFilterAtom,
} from 'src/contexts/FilterOptionAtom';
import React from 'react';
import { CheckInfinity } from './StudyContainer.style';
import { useInView } from 'react-intersection-observer';
import { getProjectAllByPage } from 'src/apis/project';
import { isUploaded } from 'src/contexts/chachingOptionAtom';
import { userAtom } from 'src/contexts/UserAtom';
import LoadingAtMain from '../Loading/LoadingAtMain';

const StudyList = () => {
  const recruitState = useRecoilValue(StatusFilterAtom);
  const techIds = useRecoilValue(TechFilterSelector);
  const textFilter = useRecoilValue(TextFilterAtom);
  const locationFilter = useRecoilValue(LocationFilterAtom);
  const uploadState = useRecoilValue(isUploaded);
  const user = useRecoilValue(userAtom);

  const fetchPostList = async (
    recruitState: string,
    techIds: string[] | null,
    pageParam: number
  ) => {
    const techIsParams = techIds !== null ? `&techStackIds=${techIds.join(',')}` : '';
    const titleParams = textFilter.title !== null ? `&title=${textFilter.title}` : '';
    const contentParams = textFilter.content !== null ? `&content=${textFilter.content}` : '';
    const authorParams = textFilter.author !== null ? `&author=${textFilter.author}` : '';
    const location =
      locationFilter.latitude !== null
        ? `&latitude=${locationFilter.latitude}&longitude=${locationFilter.longitude}`
        : '';

    const res = await getProjectAllByPage(
      9,
      pageParam,
      recruitState,
      techIsParams,
      titleParams,
      contentParams,
      authorParams,
      location
    );
    const { data } = res;
    const isLast = res.data.length === 0 ? true : false;

    return { data, nextPage: pageParam + 1, isLast };
  };

  const { ref, inView } = useInView();
  let { data, status, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
    [
      'posts',
      recruitState,
      techIds,
      textFilter.title,
      textFilter.content,
      textFilter.author,
      locationFilter,
    ],
    ({ pageParam = 0 }) => fetchPostList(recruitState, techIds, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.nextPage : undefined;
      },
      staleTime: 1000 * 20,
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  console.log(status);
  return (
    <>
      <WrapStudy className="study">
        {isLoading && <LoadingAtMain></LoadingAtMain>}

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((list: any) => (
              <StudyComponent
                key={list.id}
                id={list.id}
                techs={list.techStacks}
                deadline={list.deadline}
                title={list.title}
                image={list.member.profileImage}
                author={list.member.nickname}
                status={list.status}
              />
            ))}
          </React.Fragment>
        ))}
      </WrapStudy>
      <CheckInfinity ref={ref} className="check">
        {isLoading && <LoadingAtMain />}
      </CheckInfinity>
    </>
  );
};

export default StudyList;
