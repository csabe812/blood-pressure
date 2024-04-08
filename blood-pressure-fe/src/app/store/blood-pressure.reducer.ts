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
    years:
      state.years.indexOf(new Date().getFullYear()) < 0
        ? [...state.years, new Date().getFullYear()]
        : state.years,
    averageData:
      state.averageData.filter((f) => f.year === new Date().getFullYear())
        .length > 0
        ? state.averageData
        : [
            ...state.averageData,
            {
              year: new Date().getFullYear(),
              diaAvg: measurement.dia,
              sysAvg: measurement.sys,
              pulseAvg: measurement.pulse,
            },
          ],
  })),
  on(BloodPressureActions.set, (state, { measurements }) => ({
    lastBloodPressure: measurements[0],
    lastTenBloodPressureData: measurements,
    averageData: [],
    bloodDataByYear: [],
    years: [],
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
  })),
  on(BloodPressureActions.loadYearsSuccess, (state, { data }) => ({
    ...state,
    years: data,
  })),
  on(BloodPressureActions.addIdToLastMeasurement, (state, { data }) => ({
    ...state,
    lastBloodPressure: { ...state.lastBloodPressure, id: data },
    lastTenBloodPressureData: [
      ...state.lastTenBloodPressureData.map((m) => {
        if (!m.id) return { ...m, id: data };
        return m;
      }),
    ],
  })),
  on(BloodPressureActions.updateMeasurement, (state, { id, measurement }) => ({
    ...state,
    lastTenBloodPressureData: [
      ...state.lastTenBloodPressureData.map((m) => {
        if (id === m.id) return { ...measurement, id };
        return m;
      }),
    ],
    lastBloodPressure:
      state.lastBloodPressure.id === id
        ? { ...measurement }
        : { ...state.lastBloodPressure },
  }))
);
