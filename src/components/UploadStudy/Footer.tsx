import { FooterContainer, WrapSubmit, Submit } from './Footer.style';
import { useSetRecoilState } from 'recoil';
import { isUploaded } from '../../contexts/chachingOptionAtom';

interface iProps {
  form: {
    offline: true;
    personnel: '';
    status: 'RECRUITING';
    deadline: '';
    techStackIds: [];
    content: '';
    title: '';
  };
}
const Footer = ({ form }: iProps) => {
  const setIsUploaded = useSetRecoilState(isUploaded);

  const handleSubmit = () => {
    console.log(form);
    setIsUploaded(true);
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
