import { SearchContainer, TechsContainer, TechBtn } from './SearchMenu.style';
import { techs } from '../@icons/Images';
import { useRecoilState } from 'recoil';
import { searchTechsAtom } from '../../contexts/SearchTechsAtom';
import { useEffect, useState } from 'react';
import useCheckIsScrollOver from '../../hooks/useCheckIsScrollOver';
import { Dispatch, SetStateAction } from 'react';

interface SearchMenuProps {
  searchIsOpen: boolean;
  isHidden: [boolean, Dispatch<SetStateAction<boolean>>];
}

interface BtnStateType {
  [key: string]: boolean;
}
const SearchMenu = ({ searchIsOpen, isHidden }: SearchMenuProps) => {
  const [isScrollOver, setIsScrollOver] = isHidden;

  const handleScroll = () => {
    useCheckIsScrollOver(setIsScrollOver, 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const [filteredTech, setFilterTech] = useRecoilState(searchTechsAtom);

  const handleTechBtn = (tech: string) => {
    const copied = { ...filteredTech };
    delete copied[tech];

    const isPresentTech = filteredTech[tech];
    if (isPresentTech) {
      setFilterTech(copied);
    } else setFilterTech({ ...filteredTech, [tech]: true });
  };

  return (
    <SearchContainer
      isOpen={searchIsOpen}
      isScrollOver={isScrollOver}
      className="Search__Container"
    >
      <TechsContainer>
        {techs.map(({ tech, icon }) => (
          <TechBtn
            key={tech}
            className={`tech__Btn ${tech}`}
            onClick={() => {
              handleTechBtn(tech);
              console.log(tech);
            }}
            isOn={filteredTech[tech]}
          >
            {icon()}
            {tech}
          </TechBtn>
        ))}
      </TechsContainer>
    </SearchContainer>
  );
};

export default SearchMenu;
