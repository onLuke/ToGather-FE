import { EditContainer, Btn } from './EditBlock.style';
import { userAtom } from '../../contexts/UserAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { dataType } from '../../pages/StudyDetail';
import { removeStudy } from 'src/apis/study';
import NotificationAlert from '../Notification/NotificationAlert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditBlock = ({ data }: { data: dataType }) => {
  const userData = useRecoilValue(userAtom);
  const id = data.member.id;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/uploadStudy', {
      state: {
        id: id,
        content: data.content,
        title: data.title,
        personnel: data.personnel,
        deadline: data.deadline,
        offline: data.offline,
        techStacks: data.techStacks,
        edit: true,
      },
    });
  };

  const handleRemove = () => {
    NotificationAlert;
    confirmAlert({
      title: '확인 요청',
      message: '정말 삭제하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            if (id) removeStudy(id);
          },
        },
        {
          label: '아니오',
        },
      ],
    });
  };

  return (
    <>
      {userData.id === id && (
        <EditContainer>
          <Btn onClick={handleEdit}>수정하기</Btn>
          <Btn onClick={handleRemove}>삭제하기</Btn>
        </EditContainer>
      )}
    </>
  );
};

export default EditBlock;
