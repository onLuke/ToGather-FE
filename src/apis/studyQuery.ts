import { useQuery } from 'react-query';
import { getStudy } from './study';
import { useRecoilValue } from 'recoil';
import { isUploaded, pageNumber, isRecruiting } from '../contexts/chachingOptionAtom';

interface resType {
  content: string;
  deadline: string;
  id: number;
  location: string;
  member?: {
    email: string;
    id: number;
    nickname: string;
    profileImage: string;
  };
  personnel: number;
  status: 'COMPLETED' | 'RECRUITING';
  techStacks: number[];
  title: string;
}

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
      onSuccess: (data) => {},
      onError: (e: Error) => {
        console.log(e.message);
      },
    }
  );
  return data;
};
