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
  }))
);
