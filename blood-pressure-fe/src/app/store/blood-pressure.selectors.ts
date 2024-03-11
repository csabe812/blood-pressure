import { createSelector } from '@ngrx/store';
import { BlooodPressureData } from './blood-pressure.state';

export const selectData = (state: { bloodPressure: BlooodPressureData }) =>
  state.bloodPressure;

export const selectLastBloodPressureData = createSelector(
  selectData,
  (state: BlooodPressureData) => state.lastBloodPressure
);

export const selectLastTenBloodPressureData = createSelector(
  selectData,
  (state: BlooodPressureData) => state.lastTenBloodPressureData
);
