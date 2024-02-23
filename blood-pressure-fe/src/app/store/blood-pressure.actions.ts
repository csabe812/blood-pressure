import { createAction, props } from '@ngrx/store';
import { Measurement } from './blood-pressure.state';

export const init = createAction('[Blood Pressure] Init Data');
export const set = createAction(
  '[Blood Pressure] Set Data',
  props<{ measurements: Measurement[] }>()
);

export const saveMeasurement = createAction(
  '[Blood Pressure] Save Data',
  props<{ measurement: Measurement }>()
);
