import { FooterContainer, WrapSubmit, Submit } from './Footer.style';
import { useSetRecoilState } from 'recoil';
import { isUploaded } from '../../contexts/chachingOptionAtom';
import { createStudyQuery } from '../../apis/studyQuery';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilValue } from 'recoil';

interface iProps {
  form: {
    offline: boolean;
    personnel: string;
    status: string;
    deadline: string;
    techStackIds: number[];
    content: string;
    title: string;
    location: '';
  };
}

const Footer = ({ form }: iProps) => {
  const setIsUploaded = useSetRecoilState(isUploaded);
  const location = useRecoilValue(UserLocationAtom);
  const getElement = (name: string) => document.querySelector(name);

  const handleSubmit = () => {
    setIsUploaded(true);
    if (form.offline === true && location.La === null) {
      const regionElement = getElement('.select__region');
      if (regionElement) {
        alert('지역을 선택해주세요');
        window.scrollTo({ top: (regionElement as HTMLElement).offsetTop - 20, behavior: 'smooth' });
      }
    }
    const resultForm = { ...form, location: { latitude: location.La, longitude: location.Ma } };
    createStudyQuery(form);
    console.log(resultForm);
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
