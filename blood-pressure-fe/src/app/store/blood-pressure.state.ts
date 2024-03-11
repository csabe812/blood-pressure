import { BloodData } from '../models/blood-data';

export interface BlooodPressureData {
  lastBloodPressure: BloodData;
  lastTenBloodPressureData: BloodData[];
}

export const initialState: BlooodPressureData = {
  lastBloodPressure: {
    sys: 0,
    dia: 0,
    pulse: 0,
    other: '',
    recorded: new Date(),
  },
  lastTenBloodPressureData: [],
};
