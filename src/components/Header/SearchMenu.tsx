import {
  SearchContainer,
  TechsContainer,
  TechBtn,
  Category,
  CategoryBtn,
} from './SearchMenu.style';
import { techs } from '../@icons/Images';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useCheckIsScrollOver from '../../hooks/useCheckIsScrollOver';
import { Dispatch, SetStateAction } from 'react';
import { TechFilterAtom } from 'src/contexts/FilterOptionAtom';

interface SearchMenuProps {
  searchIsOpen: boolean;
  textIsOepn: boolean;
  isHidden: [boolean, Dispatch<SetStateAction<boolean>>];
}

const SearchMenu = ({ searchIsOpen, isHidden, textIsOepn }: SearchMenuProps) => {
  const [filteredTech, setFilteredTech] = useRecoilState(TechFilterAtom);
  const [isScrollOver, setIsScrollOver] = isHidden;
  const [categoryState, setCategory] = useState<{ [key: string]: boolean }>({});

  const handleScroll = () => {
    useCheckIsScrollOver(setIsScrollOver, 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {};
  });

  const handleTechBtn = (id: number) => {
    const copied = { ...filteredTech };
    delete copied[id];
    const isPresentTech = filteredTech[id];

    if (isPresentTech) {
      setFilteredTech(copied);
    } else setFilteredTech({ ...filteredTech, [id]: true });
  };

  const handleCategory = (e: any) => {
    const data = e.target.dataset.num;
    const copied = categoryState;

    if (categoryState[data]) {
      delete copied[data];
      setCategory({ ...copied });
    } else if (categoryState[data] === undefined) setCategory({ ...categoryState, [data]: true });
  };

  return (
    <SearchContainer
      isOpen={searchIsOpen}
      isOpenText={textIsOepn}
      isScrollOver={isScrollOver}
      className="Search__Container"
    >
      <Category>
        <CategoryBtn data-num="1" onClick={handleCategory} isOn={categoryState['1']}>
          백엔드
        </CategoryBtn>
        <CategoryBtn data-num="2" onClick={handleCategory} isOn={categoryState['2']}>
          프론트엔드
        </CategoryBtn>
        <CategoryBtn data-num="3" onClick={handleCategory} isOn={categoryState['3']}>
          모바일
        </CategoryBtn>
        <CategoryBtn data-num="4" onClick={handleCategory} isOn={categoryState['4']}>
          기타
        </CategoryBtn>
      </Category>
      <TechsContainer>
        {techs.map(
          ({ id, tech, icon, category }) =>
            (Object.keys(categoryState).join(',').includes(category.join(',')) ||
              Object.keys(categoryState).length === 0) && (
              <TechBtn
                key={tech + id}
                className={`tech__Btn`}
                onClick={() => {
                  handleTechBtn(id);
                }}
                isOn={filteredTech[id]}
              >
                {icon()}
                {tech}
              </TechBtn>
            )
        )}
      </TechsContainer>
    </SearchContainer>
  );
};

export default SearchMenu;
