import { FooterContainer, WrapSubmit, Submit } from './Footer.style';
import { useSetRecoilState } from 'recoil';
import { isUploaded } from '../../contexts/chachingOptionAtom';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
import { createStudyQuery } from 'src/service/studyQuery';
import { useNavigate } from 'react-router-dom';

interface iProps {
  form: {
    offline: boolean;
    personnel: string;
    status: string;
    deadline: string;
    techStackIds: number[];
    content: string;
    title: string;
    Location: '';
  };
}

const Footer = ({ form }: iProps) => {
  const setIsUploaded = useSetRecoilState(isUploaded);
  const location = useRecoilValue(UserLocationAtom);

  const getElement = (name: string) => document.querySelector(name);
  const [options, setOptions] = useRecoilState(NeedValueAtom);

  const navigation = useNavigate();


  const handleSubmit = () => {
    setIsUploaded(true);
    let resultForm;

    if (form.offline) {
      resultForm = {
        ...form,
        Location: location.La !== 0 ? { latitude: location.La, longitude: location.Ma } : '',
      };
    } else {
      resultForm = {
        ...form,
      };
    }

    for (let entry of Object.entries(resultForm)) {
      if (entry[1] === '' || (Array.isArray(entry[1]) && entry[1][0] === undefined)) {
        if (entry[0] === 'offline') continue;

        const regionElement = getElement('.location');
        const techSelectElement = getElement('.techStackIdsSelect');
        const personnelSelectElement = getElement('.personnelSelect');
        const calendarElement = getElement('.calendar');
        const titleElement = getElement('.title_input');

        setOptions({ ...options, [entry[0]]: true });

        switch ([entry[0]][0]) {
          case 'Location':
            window.scrollTo({
              top: (regionElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            setOptions({ ...options, Location: true });
            alert(`지역을 선택해주세요!`);

            break;
          case 'personnel':
            window.scrollTo({
              top: (personnelSelectElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            alert(`인원수을 선택해주세요!`);
            break;
          case 'deadline':
            window.scrollTo({
              top: (calendarElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            alert(`모집 마감일을 선택해주세요!`);
            break;
          case 'techStackIds':
            window.scrollTo({
              top: (techSelectElement as HTMLElement).offsetTop - 500,
              behavior: 'smooth',
            });
            alert(`사용하는 기술스택을 선택해주세요!`);
            break;
          case 'title':
            window.scrollTo({
              top: (titleElement as HTMLElement).offsetTop - 300,
              behavior: 'smooth',
            });
            alert(`제목을 입력해주세요!`);
            break;
          case 'content':
            window.scrollTo({
              top: (titleElement as HTMLElement).offsetTop - 300,
              behavior: 'smooth',
            });
            alert(`모집 소개를 입력해주세요!`);
            break;
        }
        return;
      }
    }
    createStudyQuery(resultForm);
    alert('공고가 정상 등록 되었습니다 :)');
    navigation(-1);
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
