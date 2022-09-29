import { useQuery } from 'react-query';
import { getStudy, createStudy } from '../apis/study';
import { useRecoilValue } from 'recoil';
import { isUploaded, pageNumber, isRecruiting } from '../contexts/chachingOptionAtom';
import { inputFormType } from '../pages/UploadStudy';

export const getStudyListQuery = (): any => {
  const page = useRecoilValue(pageNumber);
  const recruitState = useRecoilValue(isRecruiting);

  return useQuery(
    ['getStudyList', page],
    async () => {
      const { data } = await getStudy(page, recruitState);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: isUploaded ? 0 : 5 * 60 * 3000,
      onSuccess: (data) => {},
      onError: (e: Error) => {},
    }
  );
};

export const createStudyQuery = async (form: inputFormType) => {
  createStudy(form);
};
