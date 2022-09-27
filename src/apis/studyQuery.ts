import { useQuery } from 'react-query';
import { getStudy, createStudy } from './study';
import { useRecoilValue } from 'recoil';
import { isUploaded, pageNumber, isRecruiting } from '../contexts/chachingOptionAtom';
import { inputFormType } from '../pages/UploadStudy';

export const getStudyListQuery = (): any => {
  const page = useRecoilValue(pageNumber);
  const recruitState = useRecoilValue(isRecruiting);

  const { isLoading, data, isFetching } = useQuery(
    ['getStudyList', page],
    () => {
      getStudy(page, recruitState);
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: useRecoilValue(isUploaded) ? 0 : 60 * 1000 * 3,
      cacheTime: useRecoilValue(isUploaded) ? 0 : 60 * 1000 * 3,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    }
  );
  return data;
};

export const createStudyQuery = async (form: inputFormType) => {
  createStudy(form);
};
