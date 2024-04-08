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

export const selectAverageData = createSelector(
  selectData,
  (state: BlooodPressureData) => state.averageData
);

export const selectAverageDataByYear = (year: number) =>
  createSelector(selectData, (state: BlooodPressureData) =>
    state.averageData.find((f) => f.year === year)
  );

export const selectYearData = createSelector(
  selectData,
  (state: BlooodPressureData) => state.bloodDataByYear
);

export const selectYears = createSelector(
  selectData,
  (state: BlooodPressureData) => state.years
);
