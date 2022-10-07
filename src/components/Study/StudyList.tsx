import { WrapStudy } from './StudyList.style';
import { useInfiniteQuery } from 'react-query';
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

const StudyList = () => {
  const recruitState = useRecoilValue(StatusFilterAtom);
  const techIds = useRecoilValue(TechFilterSelector);
  const textFilter = useRecoilValue(TextFilterAtom);
  const locationFilter = useRecoilValue(LocationFilterAtom);
  const uploadState = useRecoilValue(isUploaded);

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
    const reversed = data.reverse();

    return { reversed, nextPage: pageParam + 1, isLast };
  };

  const { ref, inView } = useInView();
  let { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
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
      /*       staleTime: 3 * 60 * 1000,
      refetchOnWindowFocus: false, */
      refetchOnMount: 'always',
    }
  );

  Array.isArray(data) &&
    data.sort((a, b) => {
      return Number(a.deadline) - Number(b.deadline);
    });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <WrapStudy className="study">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.reversed.map((list: any) => (
              <StudyComponent
                key={list.id}
                id={list.id}
                techs={list.techStacks}
                deadline={list.deadline}
                title={list.title}
                image={list.member.profileImage}
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
