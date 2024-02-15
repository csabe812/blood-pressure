import { createReducer, on } from '@ngrx/store';
import * as BloodPressureActions from './blood-pressure.actions';
import { BloodPressureType } from './blood-pressure.state';

const initialState: BloodPressureType = {
  sys: 0,
  dia: 0,
  pulse: 0,
  other: '',
};

export const bloodPressureReducer = createReducer(
  initialState,
  on(BloodPressureActions.saveData, (state, { bloodPressure }) => {
    return {
      ...bloodPressure,
    };
  }),
  on(BloodPressureActions.loadLastData, (state) => ({
    ...state,
  }))
);
