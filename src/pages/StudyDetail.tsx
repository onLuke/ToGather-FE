import Main from '../components/StudyDetail/WrapSection';
import InfoContainer from 'src/components/StudyDetail/Info';
import Header from '../components/StudyDetail/Header';
import Comments from 'src/components/StudyDetail/Comment';
import FixedDetail from '../components/StudyDetail/FixedDetail';
import TabletFixedDetail from '../components/StudyDetail/TabletFixedDetail';
import { useRecoilValue } from 'recoil';
/* import { getStudyDetailQuery } from 'src/service/studyQuery'; */

const StudyDetail = () => {
  /*   const projectDetail = useRecoilValue(ProjectDetailAtom);

  const { data } = getStudyDetailQuery(projectDetail.projectId); */

  return (
    <>
      <Main>
        <Header /* gettedData={data}  */ />
        <InfoContainer /* gettedData={data} */ />;
        <Comments />
      </Main>
      <FixedDetail /* gettedData={data} */ />
      <TabletFixedDetail /* gettedData={data} */ />
    </>
  );
};

export default StudyDetail;
