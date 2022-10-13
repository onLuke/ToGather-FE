import Main from '../components/StudyDetail/WrapSection';
import InfoContainer from 'src/components/StudyDetail/Info';
import Header from '../components/StudyDetail/Header';
import Comments from 'src/components/StudyDetail/Comment';
import FixedDetail from '../components/StudyDetail/FixedDetail';
import TabletFixedDetail from '../components/StudyDetail/TabletFixedDetail';
import EditBlock from 'src/components/StudyDetail/EditBlock';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enterProjectById, getProjectById } from 'src/apis/project';
import { userAtom } from 'src/contexts/UserAtom';
import { addComments, removeComments, updateComments } from 'src/apis/comment';
import PostButton from 'src/components/StudyDetail/PostButton';
import { toast } from 'react-toastify';

export interface dataType {
  id: string;
  content: string;
  comments: any[];
  member: any;
  title: string;
  personnel: string;
  status: string;
  location: string;
  deadline: string;
  offline: string;
  techStacks: { id: number; name: string; category: string; image: string }[];
}

const StudyDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userAtom);
  const [data, setData] = useState<dataType>({
    id: '',
    content: '',
    comments: [],
    member: [],
    title: '',
    personnel: '',
    status: '',
    location: '',
    deadline: '',
    offline: '',
    techStacks: [],
  });
  const [commentForm, setCommentForm] = useState('');
  const [commentMod, setCommentMod] = useState({ id: '', mod: false });
  const [modCommentForm, setModCommentForm] = useState('');

  useEffect(() => {
    getDetailProject();
  }, []);

  const getDetailProject = async () => {
    if (id) {
      try {
        const response = await getProjectById(id);
        setData({ ...response.data, comments: response.data.comments.reverse() });
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

        console.log(response);

        if (response.status === 200 && response.data === '') {
          toast.success('지원 성공.');
          return;
        }

        if (response.data.status === 400) {
          console.error(response.data.errorMessage);
          toast.error(response.data.errorMessage);
          return;
        }
      } catch (e) {
        toast.info('다시 시도해주세요.');
        console.error(e);
      }
    }
  };

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '\n') {
      setCommentForm('');
      return;
    }
    setCommentForm(value);
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleOnChangeModComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setModCommentForm(value);
  };

  const handleAddComment = async () => {
    if (commentForm === '') {
      toast.info('댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await addComments(String(id), commentForm);
      setCommentForm('');
      setData((prevData: any) => ({
        ...prevData,
        comments: [response.data, ...prevData.comments],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleModComment = (e: React.MouseEvent<HTMLElement>, content: string) => {
    e.preventDefault();
    const commentId = e.currentTarget.dataset.commentid!;

    setCommentMod({ id: commentId, mod: true });
    setModCommentForm(content.replace(/^"(.*)"$/, '$1'));
  };

  const handleSubmitModComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const commentId = e.currentTarget.dataset.commentid!;
    const comment = modCommentForm;

    try {
      const response = await updateComments(commentId, comment);

      if (response.data?.status) {
        toast.info('다시 시도해 주세요.');
        return;
      }

      if (response.status === 200) {
        toast.success('댓글 수정완료.');

        const updateComment = data.comments.map((item: any) =>
          item.id === response.data.id ? response.data : item
        );
        setCommentMod({ id: '', mod: false });
        setData((prevData: any) => ({
          ...prevData,
          comments: updateComment,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const commentId = e.currentTarget.dataset.commentid!;

    try {
      const response = await removeComments(commentId);

      if (response.data.status) {
        toast.info('다시 시도해 주세요.');
      }

      const filterdData = data.comments.filter((item: any) => item.id != commentId);
      setCommentMod({ id: '', mod: false });

      setData((prevData: any) => ({
        ...prevData,
        comments: filterdData,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <>
      <Main>
        <Header gettedData={data} />
        <EditBlock data={data}></EditBlock>
        <InfoContainer gettedData={data} />
        <Comments
          userId={user.id}
          gettedData={data}
          commentValue={commentForm}
          modCommnetValue={commentMod}
          changeCommentValue={modCommentForm}
          setComment={handleOnChangeComment}
          addComment={handleAddComment}
          modComment={handleModComment}
          chageComment={handleOnChangeModComment}
          submitComment={handleSubmitModComment}
          removeComment={handleRemoveComment}
          inputKeyPress={inputKeyPress}
        />
      </Main>
      <FixedDetail userId={user.id} gettedData={data} handleEnter={handleEnterProject} />
      <TabletFixedDetail userId={user.id} gettedData={data} handleEnter={handleEnterProject} />
    </>
  );
};

export default StudyDetail;
