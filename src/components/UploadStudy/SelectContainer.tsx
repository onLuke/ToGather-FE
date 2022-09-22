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
import { stacktech } from '../../mocks/SelectTechs';
import Calendar from './Calendar';
import Select from 'react-select';
import UploadOptions from '../../constants/UploadOptions';
import { GpsContainer } from '../Header/HeaderNavigation.styles';
import { GpsIcon } from '../@icons';
import { useState } from 'react';

interface iProps {
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectChange: (targetValue: any, targetName: any) => void;
  datePickerChange: (date: Date) => void;
  multiSelectChange: (targetValue: any, targetAction: any) => void;
}

const SelectContainer = (props: iProps) => {
  const [region, setRegion] = useState('');
  const [isOffline, setIsOffline] = useState(true);

  const { changeInput, selectChange, datePickerChange, multiSelectChange } = props;

  const handleRegionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setRegion(newValue);
  };

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
        <WrapMapInput>
          <WrapRegionSelect isOffline={!isOffline}>
            <GpsContainer>
              <GpsIcon />
            </GpsContainer>
            <RegionInput
              type="text"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
              }}
              placeholder="좌측 아이콘을 눌러 지역 선택하기"
              aria-label="좌측 아이콘을 눌러 지역을 선택할 수 있습니다"
              onChange={changeInput}
            />
          </WrapRegionSelect>
        </WrapMapInput>
        <WrapTechSelect>
          <Select
            isMulti
            id="techStackIds"
            className="techStackIdsSelect"
            name="techStackIds"
            placeholder="기술 스택"
            options={stacktech}
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
