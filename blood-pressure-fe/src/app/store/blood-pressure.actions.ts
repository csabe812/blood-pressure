import { createAction, props } from '@ngrx/store';
import { BloodData } from '../models/blood-data';

export const init = createAction('[Blood Pressure] Init Data');
export const set = createAction(
  '[Blood Pressure] Set Data',
  props<{ measurements: BloodData[] }>()
);

export const saveMeasurement = createAction(
  '[Blood Pressure] Save Data',
  props<{ measurement: BloodData }>()
);

export const addMeasurement = createAction(
  '[Blood Pressure] Add Measurement',
  props<{ measurement: BloodData }>()
);
