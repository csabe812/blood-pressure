import { createSelector } from '@ngrx/store';
import { BloodPressureType } from './blood-pressure.state';

export const selectBloodPressureData = (state: {
  bloodPressure: BloodPressureType;
}) => state.bloodPressure;

export const hasData = createSelector(
  selectBloodPressureData,
  (data) => data.sys > 0 && data.dia > 0 && data.pulse > 0
);
