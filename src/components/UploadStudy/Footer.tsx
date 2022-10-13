import { FooterContainer, WrapSubmit, Submit } from './Footer.style';
import { useSetRecoilState } from 'recoil';
import { isUploaded } from '../../contexts/chachingOptionAtom';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStudy, updateStudy } from 'src/apis/study';

const Footer = ({ form, isEdit, id }: any) => {
  const setIsUploaded = useSetRecoilState(isUploaded);
  const location = useRecoilValue(UserLocationAtom);
  const [options, setOptions] = useRecoilState(NeedValueAtom);
  const navigation = useNavigate();

  const resultForm = form.offline
    ? {
        ...form,
        latitude: location.La,
        longitude: location.Ma,
        address: location.regionName,
      }
    : {
        ...form,
      };

  const getElement = (name: string) => document.querySelector(name);

  const handleSubmit = () => {
    let success = false;

    for (let entry of Object.entries(resultForm)) {
      if (entry[1] === '' || (Array.isArray(entry[1]) && entry[1].length === 0)) {
        if (entry[0] === 'offline') continue;

        const regionElement = getElement('.location');
        const techSelectElement = getElement('.techStackIdsSelect');
        const personnelSelectElement = getElement('.personnelSelect');
        const calendarElement = getElement('.calendar');
        const titleElement = getElement('.title_input');

        setOptions({ ...options, [entry[0]]: true });

        switch (entry[0]) {
          case 'address':
            window.scrollTo({
              top: (regionElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            setOptions({ ...options, Location: true });
            toast.warning(`지역을 선택해주세요!`);
            break;
          case 'personnel':
            window.scrollTo({
              top: (personnelSelectElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            toast.warning(`인원수을 선택해주세요!`);
            break;
          case 'deadline':
            window.scrollTo({
              top: (calendarElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            toast.warning(`모집 마감일을 선택해주세요!`);
            break;
          case 'techStackIds':
            window.scrollTo({
              top: (techSelectElement as HTMLElement).offsetTop - 500,
              behavior: 'smooth',
            });
            toast.warning(`사용하는 기술스택을 선택해주세요!`);
            break;
          case 'title':
            window.scrollTo({
              top: (titleElement as HTMLElement).offsetTop - 300,
              behavior: 'smooth',
            });
            toast.warning(`제목을 입력해주세요!`);
            break;
          case 'content':
            window.scrollTo({
              top: (titleElement as HTMLElement).offsetTop - 300,
              behavior: 'smooth',
            });
            toast.warning(`모집 소개를 입력해주세요!`);
            break;
        }
        return;
      }
    }
    success = true;
    if (success) {
      id ? updateStudy(resultForm, id) : createStudy(resultForm);
      setIsUploaded(true);
      toast.success('공고가 정상 등록되었습니다.');
      navigation('/');
    }
  };

  return (
    <>
      <FooterContainer>
        <WrapSubmit>
          <Submit onClick={handleSubmit}>제출하기</Submit>
        </WrapSubmit>
      </FooterContainer>
    </>
  );
};

export default Footer;
