import { atom, selector } from 'recoil';
import { techsNameTable } from '../mocks/TechsTableTest';
import { StudyListTest } from '../mocks/StudyListTest';
import { techs } from 'src/components/@icons';

interface searchedTechsType {
  [key: string]: boolean;
}

interface filteredtechsToNumber {
  techs: number[];
}

const searchTechsAtom = atom<searchedTechsType>({
  key: 'SEARCHED_TECHS',
  default: {},
});

const searchTechsSelectObject = selector({
  key: 'SEARCHED_TECHS_OBJECT',
  get: ({ get }) => {
    get(searchTechsAtom);
  },
});

const filteredStudy = selector({
  key: 'SEARCHED_STUDY_LIST',
  get: ({ get }) => {
    const searchedTechs: searchedTechsType = get(searchTechsAtom);
    if (Object.keys(searchedTechs).length !== 0) {
      const res = StudyListTest.filter(({ techs }) => {
        return techs.some((tech) => {
          return searchedTechs[String(tech)];
        });
      });
      return res;
    } else return StudyListTest;
  },
});

export { searchTechsAtom, filteredStudy };
