import { useInfiniteQuery, useQuery } from 'react-query';
import { getStudy, createStudy, getDetail } from '../apis/study';
import { useRecoilValue } from 'recoil';
import { isUploaded, pageNumber, isRecruiting } from '../contexts/chachingOptionAtom';
import { inputFormType } from '../pages/UploadStudy';
import { TechFilterSelector, TitleFilterAtom } from 'src/contexts/FilterOptionAtom';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Api from 'src/apis/Api';

/* export const getStudyDetail = () => {


  return useQuery(
    ['getDetail']
    async () => {
      console.log('get');
      const { data } = await getStudy(page, recruitState, techIds, title);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: Infinity,
      onSuccess: (data) => {},
      onError: (e: Error) => {},
    }
  );
}; */

export const createStudyQuery = async (form: any) => {
  createStudy(form);
};

export const getDetailQuery = (id: string) => {
  return useQuery(
    ['getDetail', id],
    async () => {
      const data = await getDetail(id);
      return data;
    },
    {
      onSuccess: (data) => {},
      onError: (e: Error) => {},
    }
  );
};
