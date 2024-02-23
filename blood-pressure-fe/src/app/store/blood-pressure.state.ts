export interface Measurement {
  sys: number;
  dia: number;
  pulse: number;
  other: string;
  recorded: Date;
}

export interface BlooodPressureData {
  lastBloodPressure: Measurement;
  lastTenBloodPressureData: Measurement[];
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
