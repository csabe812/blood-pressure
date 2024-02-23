import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlooodPressureData } from './blood-pressure.state';

export const selectBloodPressureFeature =
  createFeatureSelector<BlooodPressureData>('bloodPressure');

export const selectLastBloodPressureData = createSelector(
  selectBloodPressureFeature,
  (state: BlooodPressureData) => state.lastBloodPressure
);

export const selectLastTenBloodPressureData = createSelector(
  selectBloodPressureFeature,
  (state: BlooodPressureData) => state.lastTenBloodPressureData
);
