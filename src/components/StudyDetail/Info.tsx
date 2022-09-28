import { InfoBlock, Info, Content } from './Info.style';

import React from 'react';

interface iProps {
  gettedData: any;
}
const InfoContainer = ({ gettedData }: iProps) => {
  const options = ['모집상태', '위치', '온/오프라인', '사용하는 기술 스택'];

  return (
    <>
      <InfoBlock>
        {options.map((el) => {
          return <Info key={el}>{el}</Info>;
        })}
      </InfoBlock>
      <Content>
        메모이제이션된 값을 반환합니다. “생성(create)” 함수와 그것의 의존성 값의 배열을 전달하세요.
        useMemo는 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산 할 것입니다. 이 최적화는
        모든 렌더링 시의 고비용 계산을 방지하게 해 줍니다. useMemo로 전달된 함수는 렌더링 중에
        실행된다는 것을 기억하세요. 통상적으로 렌더링 중에는 하지 않는 것을 이 함수 내에서 하지
        마세요. 예를 들어, 사이드 이펙트(side effects)는 useEffect에서 하는 일이지 useMemo에서 하는
        일이 아닙니다. 배열이 없는 경우 매 렌더링 때마다 새 값을 계산하게 될 것입니다. useMemo는
        성능 최적화를 위해 사용할 수는 있지만 의미상으로 보장이 있다고 생각하지는 마세요. 가까운
        미래에 React에서는, 이전 메모이제이션된 값들의 일부를 “잊어버리고” 다음 렌더링 시에 그것들을
        재계산하는 방향을 택할지도 모르겠습니다. 예를 들면, 오프스크린 컴포넌트의 메모리를 해제하는
        등이 있을 수 있습니다. useMemo를 사용하지 않고도 동작할 수 있도록 코드를 작성하고 그것을
        추가하여 성능을 최적화하세요. 주의 의존성 값의 배열은 함수에 인자로 전달되지는 않습니다.
        그렇지만 개념적으로는, 이 기법은 함수가 무엇일지를 표현하는 방법입니다. 함수 안에서 참조되는
        모든 값은 의존성 값의 배열에 나타나야 합니다. 나중에는 충분히 발전된 컴파일러가 이 배열을
        자동으로 생성할 수 있을 것입니다. eslint-plugin-react-hooks 패키지의 일부로써
        exhaustive-deps 규칙을 사용하기를 권장합니다. 그것은 의존성이 바르지 않게 정의되었다면 그에
        대해 경고하고 수정하도록 알려줍니다.
      </Content>
    </>
  );
};

export default InfoContainer;
