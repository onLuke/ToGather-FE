import Main from '../components/StudyDetail/WrapSection';
import InfoContainer from 'src/components/StudyDetail/Info';
import Header from '../components/StudyDetail/Header';
import Comments from 'src/components/StudyDetail/Comment';
import FixedDetail from '../components/StudyDetail/FixedDetail';
import TabletFixedDetail from '../components/StudyDetail/TabletFixedDetail';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enterProjectById, getProjectById } from 'src/apis/project';
import { userAtom } from 'src/contexts/UserAtom';

const StudyDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userAtom);
  const [data, setData] = useState({});

  useEffect(() => {
    getDetailProject();
  }, []);

  const getDetailProject = async () => {
    if (id) {
      try {
        const response = await getProjectById(id);
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEnterProject = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (id) {
      try {
        const response = await enterProjectById(id);

        if (response.data.status === 200) {
          alert('지원 되었습니다.');
        }

        if (response.data.status === 400) {
          alert(response.data.errorMessage);
        }
      } catch (e) {
        alert('다시 시도해주세요.');
        console.error(e);
      }
    }
  };

  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <>
      <Main>
        <Header gettedData={data} />
        <InfoContainer gettedData={data} />;
        <Comments gettedData={data} />
      </Main>
      <FixedDetail userId={user.id} gettedData={data} handleEnter={handleEnterProject} />
      <TabletFixedDetail userId={user.id} gettedData={data} handleEnter={handleEnterProject} />
    </>
  );
};

export default StudyDetail;
