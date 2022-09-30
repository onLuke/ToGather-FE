import { FooterContainer, WrapSubmit, Submit } from './Footer.style';
import { useSetRecoilState } from 'recoil';
import { isUploaded } from '../../contexts/chachingOptionAtom';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';

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
            break;
          case 'personnel':
            window.scrollTo({
              top: (personnelSelectElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            break;
          case 'deadline':
            window.scrollTo({
              top: (calendarElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            break;
          case 'techStackIds':
            window.scrollTo({
              top: (techSelectElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            break;
          case 'title':
            window.scrollTo({
              top: (titleElement as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
            break;
        }
        break;
      }
    }
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
