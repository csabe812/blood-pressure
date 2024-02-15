import { createAction, props } from '@ngrx/store';
import { BloodPressureType } from './blood-pressure.state';

export const saveData = createAction(
  '[Blood Pressure] Save Data',
  props<{ bloodPressure: BloodPressureType }>()
);

export const loadLastData = createAction('[Blood Pressure] Load Last Data');
