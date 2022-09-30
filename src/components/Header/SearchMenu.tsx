import { SearchContainer, TechsContainer, TechBtn } from './SearchMenu.style';
import { techs } from '../@icons/Images';
import { useRecoilState } from 'recoil';
import { searchTechsAtom } from '../../contexts/SearchTechsAtom';
import { useEffect } from 'react';
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

  const handleScroll = () => {
    useCheckIsScrollOver(setIsScrollOver, 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleTechBtn = (id: number) => {
    const copied = { ...filteredTech };
    delete copied[id];
    const isPresentTech = filteredTech[id];

    if (isPresentTech) {
      setFilteredTech(copied);
    } else setFilteredTech({ ...filteredTech, [id]: true });
  };

  return (
    <SearchContainer
      isOpen={searchIsOpen}
      isOpenText={textIsOepn}
      isScrollOver={isScrollOver}
      className="Search__Container"
    >
      <TechsContainer>
        {techs.map(({ id, tech, icon }) => (
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
        ))}
      </TechsContainer>
    </SearchContainer>
  );
};

export default SearchMenu;
