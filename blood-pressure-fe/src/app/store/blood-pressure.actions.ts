import { createAction, props } from '@ngrx/store';
import { AverageData } from '../models/average-data';
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

export const loadAverageData = createAction(
  '[Blood Pressure] Load Average Data'
);

export const loadAverageDataSuccess = createAction(
  '[Blood Pressure] Load Average Data Success',
  props<{ averageData: AverageData[] }>()
);

export const loadAverageDataFailed = createAction(
  '[Blood Pressure] Load Average Data Failed',
  props<{ error: any }>()
);

export const loadDataByYear = createAction(
  '[Blood Pressure] Load Blood Data By Year',
  props<{ year: number }>()
);

export const loadDataByYearSuccess = createAction(
  '[Blood Pressure] Load Blood Data By Year Success',
  props<{ data: BloodData[] }>()
);

export const loadDataByYearFailed = createAction(
  '[Blood Pressure] Load Blood Data By Year Failed',
  props<{ error: any }>()
);
