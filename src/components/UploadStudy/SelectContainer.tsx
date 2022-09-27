import {
  WrapSelects,
  RestSelectBlock,
  WrapRegionSelect,
  RegionInput,
  WrapMapInput,
  OnOfflineBlock,
  WraponOffline,
  WrapTechSelect,
} from './SelectContainer.style';
import Calendar from './Calendar';
import Select from 'react-select';
import UploadOptions from '../../constants/UploadOptions';
import { GpsContainer } from '../Header/HeaderNavigation.styles';
import { GpsIcon } from '../@icons';
import { useContext, useState } from 'react';
import techTable from '../../contexts/TechsTable';
import { modalContext } from 'src/contexts/ModalContext';
import MapModal from '../Modal/MapModal';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilValue } from 'recoil';

interface iProps {
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectChange: (targetValue: any, targetName: any) => void;
  datePickerChange: (date: Date) => void;
  multiSelectChange: (targetValue: any, targetAction: any) => void;
}

const SelectContainer = (props: iProps) => {
  const [isOffline, setIsOffline] = useState(true);
  const location = useRecoilValue(UserLocationAtom);
  const openModalContext = useContext(modalContext);

  const handleKakaoOpenModal = () => {
    openModalContext?.openModal?.(<MapModal />);
  };

  const { changeInput, selectChange, datePickerChange, multiSelectChange } = props;

  const handleOnOffline = (targetValue: any, targetName: any) => {
    selectChange(targetValue, targetName);
    setIsOffline(targetValue.value);
  };

  return (
    <WrapSelects>
      <OnOfflineBlock>
        <WraponOffline>
          <Select
            defaultValue={UploadOptions.onOffline[1]}
            id="offline"
            className="offlineSelect"
            name="offline"
            placeholder="온라인/오프라인"
            options={UploadOptions.onOffline}
            aria-label="온라인 오프라인 선택"
            autoFocus
            onChange={handleOnOffline}
          />
        </WraponOffline>
        <WrapRegionSelect isOffline={!isOffline}>
          <WrapMapInput>
            <GpsContainer onClick={handleKakaoOpenModal}>
              <GpsIcon />
            </GpsContainer>
            <RegionInput
              className="select__region"
              type="text"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
              }}
              placeholder="좌측 아이콘을 눌러 지역 선택하기"
              aria-label="좌측 아이콘을 눌러 지역을 선택할 수 있습니다"
              onChange={changeInput}
              value={location.regionName}
            />
          </WrapMapInput>
        </WrapRegionSelect>
        <WrapTechSelect>
          <Select
            isMulti
            id="techStackIds"
            className="techStackIdsSelect"
            name="techStackIds"
            placeholder="기술 스택"
            options={techTable}
            onChange={multiSelectChange}
            classNamePrefix="select"
          />
        </WrapTechSelect>
      </OnOfflineBlock>

      <RestSelectBlock>
        <Select
          isClearable
          id="personnel"
          className="personnelSelect"
          name="personnel"
          placeholder="모집인원"
          options={UploadOptions.personnel}
          onChange={selectChange}
        />
        <Calendar datePickerChangeDispatch={datePickerChange} />
      </RestSelectBlock>
    </WrapSelects>
  );
};

export default SelectContainer;
