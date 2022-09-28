import Main from '../components/StudyDetail/WrapSection';
import InfoContainer from 'src/components/StudyDetail/Info';
import Header from '../components/StudyDetail/Header';
import Comments from 'src/components/StudyDetail/Comment';
import FixedDetail from '../components/StudyDetail/FixedDetail';
import TabletFixedDetail from '../components/StudyDetail/TabletFixedDetail';

const StudyDetail = () => {
  return (
    <>
      <Main>
        <Header />
        <InfoContainer />;
        <Comments />
      </Main>
      <FixedDetail />
      <TabletFixedDetail />
    </>
  );
};

export default StudyDetail;
