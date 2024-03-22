import { createReducer, on } from '@ngrx/store';
import * as BloodPressureActions from './blood-pressure.actions';
import { initialState } from './blood-pressure.state';

export const bloodPressureReducer = createReducer(
  initialState,
  on(BloodPressureActions.saveMeasurement, (state, { measurement }) => ({
    ...state,
    lastBloodPressure: measurement,
    lastTenBloodPressureData: [
      measurement,
      ...state.lastTenBloodPressureData.slice(0, 9),
    ],
  })),
  on(BloodPressureActions.set, (state, { measurements }) => ({
    lastBloodPressure: measurements[0],
    lastTenBloodPressureData: measurements,
    averageData: [],
    bloodDataByYear: [],
  })),
  on(BloodPressureActions.loadAverageDataSuccess, (state, { averageData }) => ({
    ...state,
    averageData,
  })),
  on(BloodPressureActions.loadDataByYearSuccess, (state, { data }) => ({
    ...state,
    bloodDataByYear: [...data].sort(
      (a, b) => new Date(a.recorded).getTime() - new Date(b.recorded).getTime()
    ),
  }))
);
