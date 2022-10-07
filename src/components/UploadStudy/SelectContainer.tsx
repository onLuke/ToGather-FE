import {
  WrapSelects,
  RestSelectBlock,
  WrapRegionSelect,
  RegionInput,
  WrapMapInput,
  OnOfflineBlock,
  WraponOffline,
  WrapTechSelect,
  WarnBox,
} from './SelectContainer.style';
import Calendar from './Calendar';
import Select from 'react-select';
import UploadOptions from '../../constants/UploadOptions';
import { GpsContainer } from '../Header/HeaderNavigation.styles';
import { GpsIcon } from '../@icons';
import { useContext, useEffect, useRef, useState } from 'react';
import techTable from '../../contexts/TechsTable';
import { modalContext } from 'src/contexts/ModalContext';
import MapModal from '../Modal/MapModal';
import { UserLocationAtom, regionNameSelector } from '../../contexts/UserLocationAtom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { NeedSelector, NeedValueAtom } from 'src/contexts/needValue';

interface iProps {
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectChange: (targetValue: any, targetName: any) => void;
  datePickerChange: (date: Date) => void;
  multiSelectChange: (targetValue: any, targetAction: any) => void;
}

const SelectContainer = (props: iProps) => {
  const needValue = useRecoilValue(NeedSelector);
  const [option, setOption] = useRecoilState(NeedValueAtom);
  const [isOffline, setIsOffline] = useState(true);
  const [location, setLocation] = useRecoilState(UserLocationAtom);
  const openModalContext = useContext(modalContext);

  const handleKakaoOpenModal = () => {
    openModalContext?.openModal?.(<MapModal />);
  };

  const { selectChange, datePickerChange, multiSelectChange } = props;

  const handleOnOffline = (targetValue: any, targetName: any) => {
    selectChange(targetValue, targetName);
    setIsOffline(targetValue.value);
  };

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current && inputRef.current.value.length === 0 && inputRef.current.value !== '') {
      setOption({ ...option, Location: true });
    } else setOption({ ...option, Location: false });
  }, [inputRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.value.length === 0 && inputRef.current.value !== '') {
      setOption({ ...option, Location: true });
    } else setOption({ ...option, Location: false });
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
              value={location.regionName}
              id="location"
              className="location"
              type="text"
              placeholder="좌측 아이콘을 눌러 지역 선택하기"
              aria-label="좌측 아이콘을 눌러 지역을 선택할 수 있습니다"
              onChange={handleInputChange}
              ref={inputRef}
            />
          </WrapMapInput>
        </WrapRegionSelect>
        <WarnBox isHidden={isOffline && needValue === 'Location'}>지역을 입력해주세요</WarnBox>
        <WrapTechSelect>
          <Select
            isMulti
            id="techStackIds"
            className="techStackIdsSelect"
            name="techStackIds"
            placeholder="기술 스택"
            options={techTable}
            onChange={(multiValue, actionMeta) => {
              if (multiValue.length >= 10) {
                alert('사용 기술스택은 10개 이상 등록할 수 없습니다 :(');
                Array.isArray(multiValue) && multiValue.pop();
              } else multiSelectChange(multiValue, actionMeta);
            }}
            classNamePrefix="select"
          />
        </WrapTechSelect>
        <WarnBox isHidden={needValue === 'techStackIds'}>기술을 선택해주세요</WarnBox>
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
        <WarnBox isHidden={needValue === 'personnel'}>모집인원을 선택해주세요</WarnBox>
        <Calendar datePickerChangeDispatch={datePickerChange} />
        <WarnBox isHidden={needValue === 'deadline'}>모집마감일을 선택해주세요</WarnBox>
      </RestSelectBlock>
    </WrapSelects>
  );
};

export default SelectContainer;
