import React, { forwardRef, useState } from 'react';
import {
  UploadPageMain,
  Heading,
  WrapSelects,
  RestSelectBlock,
  WrapRegionSelect,
  RegionInput,
  WrapMapInput,
  OnOfflineBlock,
  WraponOffline,
  CustomContainer,
} from './UploadStudy.style';
import Select from 'react-select';
import CustonDatePicker from './CustonDatePicker';
import makeAnimated from 'react-select/animated';
import UploadOptions from '../../constants/UploadOptions';
import { GpsContainer } from '../Header/HeaderNavigation.styles';
import { GpsIcon } from '../@icons';
import useInput from '../../hooks/useInput';
import Calendar from './Calendar';

const UploadStudy = () => {
  const [region, setRegion] = useState('');
  const [isOffline, setIsOffline] = useState(true);
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const { form, changeInput, selectChange, multiSelectChange, datePickerChange } = useInput({});

  const handleRegionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setRegion(newValue);
  };
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleOnOffline = (targetValue: any, targetName: any) => {
    selectChange(targetValue, targetName);
    setIsOffline(targetValue.value);
  };

  return (
    <UploadPageMain>
      <Heading>등록할 공고 정보를 선택해주세요</Heading>
      <WrapSelects>
        <OnOfflineBlock>
          <WraponOffline>
            <Select
              defaultValue={UploadOptions.onOffline[1]}
              id="onOffline"
              className="onOffSelect"
              name="onOffline"
              placeholder="온라인/오프라인"
              options={UploadOptions.onOffline}
              aria-label="온라인 오프라인 선택"
              autoFocus
              onChange={handleOnOffline}
            />
          </WraponOffline>
          <WrapMapInput>
            <WrapRegionSelect isOffline={!isOffline}>
              <RegionInput
                placeholder="우측 아이콘을 눌러 지역 선택하기"
                aria-label="좌측 아이콘을 눌러 지역을 선택할 수 있습니다"
                onChange={changeInput}
              />
              <GpsContainer>
                <GpsIcon />
              </GpsContainer>
            </WrapRegionSelect>
          </WrapMapInput>
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
          <Calendar
            selected={startDate}
            startDateDispatch={setStartDate}
            datePickerChangeDispatch={datePickerChange}
          />
        </RestSelectBlock>
      </WrapSelects>
    </UploadPageMain>
  );
};

export default UploadStudy;
