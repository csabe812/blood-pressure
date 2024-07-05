import {
  addIdToLastMeasurement,
  loadAverageDataSuccess,
  loadDataByYearSuccess,
  loadYearsSuccess,
  saveMeasurement,
  set,
  updateMeasurement,
} from './blood-pressure.actions';
import { bloodPressureReducer } from './blood-pressure.reducer';
import { initialState } from './blood-pressure.state';

describe('BloodPressureReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const state = bloodPressureReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set a default state', () => {
    const measurements = [
      {
        sys: 120,
        dia: 80,
        pulse: 70,
        other: 'Test0',
        mood: 'TestOK0',
        recorded: new Date(),
      },
      {
        sys: 121,
        dia: 81,
        pulse: 71,
        other: 'Test1',
        mood: 'TestOK1',
        recorded: new Date(),
      },
    ];
    const action = set({ measurements });
    const result = bloodPressureReducer(initialState, action);

    expect(result.lastBloodPressure).toEqual(measurements[0]);
    expect(result.lastTenBloodPressureData.length).toEqual(2);
  });

  it('should save an item to the state part1', () => {
    const measurement = {
      sys: 120,
      dia: 80,
      pulse: 70,
      other: 'Test',
      mood: 'TestOK',
      recorded: new Date(),
    };
    const action = saveMeasurement({ measurement });
    const result = bloodPressureReducer(initialState, action);

    expect(result.lastBloodPressure).toEqual(measurement);
    expect(result.lastTenBloodPressureData[0]).toEqual(measurement);
    expect(result.years).toContain(2024);
    expect(result.years).not.toContain(2020);
    expect(result.averageData[0]).toEqual({
      year: 2024,
      diaAvg: 80,
      sysAvg: 120,
      pulseAvg: 70,
    });
  });

  it('should save an item to the state part2', () => {
    const measurement = {
      sys: 120,
      dia: 80,
      pulse: 70,
      other: 'Test',
      mood: 'TestOK',
      recorded: new Date(),
    };
    const action = saveMeasurement({ measurement });
    const result = bloodPressureReducer(
      { ...initialState, years: [2020, 2021, 2022, 2023, 2024] },
      action
    );

    expect(result.lastBloodPressure).toEqual(measurement);
    expect(result.lastTenBloodPressureData[0]).toEqual(measurement);
    expect(result.years).toContain(2024);
    expect(result.years).not.toContain(2019);
    expect(result.averageData[0]).toEqual({
      year: 2024,
      diaAvg: 80,
      sysAvg: 120,
      pulseAvg: 70,
    });
  });

  it('should save an item to the state part3', () => {
    const measurement = {
      sys: 120,
      dia: 80,
      pulse: 70,
      other: 'Test',
      mood: 'TestOK',
      recorded: new Date(),
    };
    const action = saveMeasurement({ measurement });
    const result = bloodPressureReducer(
      {
        ...initialState,
        years: [2024],
        averageData: [{ year: 2024, sysAvg: 120, diaAvg: 80, pulseAvg: 70 }],
      },
      action
    );

    expect(result.lastBloodPressure).toEqual(measurement);
    expect(result.lastTenBloodPressureData[0]).toEqual(measurement);
    expect(result.years).toContain(2024);
    expect(result.years).not.toContain(2019);
    expect(result.averageData[0]).toEqual({
      year: 2024,
      diaAvg: 80,
      sysAvg: 120,
      pulseAvg: 70,
    });
  });

  it('should load average data', () => {
    const averageData = [
      {
        year: 2024,
        sysAvg: 125,
        diaAvg: 85,
        pulseAvg: 75,
      },
    ];
    const action = loadAverageDataSuccess({ averageData });
    const result = bloodPressureReducer(initialState, action);

    expect(result.averageData.length).toEqual(1);
  });

  it('should load (and sort) data by year', () => {
    const data = [
      {
        sys: 120,
        dia: 80,
        pulse: 70,
        other: 'Other1',
        recorded: new Date(2024, 1, 1),
      },
      {
        sys: 130,
        dia: 90,
        pulse: 80,
        other: 'Other2',
        recorded: new Date(2023, 1, 1),
      },
    ];
    const action = loadDataByYearSuccess({ data });
    const result = bloodPressureReducer(initialState, action);

    expect(result.bloodDataByYear[0]).toEqual(data[1]);
  });

  it('should load years', () => {
    const data = [2018, 2019, 2020, 2021];
    const action = loadYearsSuccess({ data });
    const result = bloodPressureReducer(initialState, action);

    expect(result.years.length).toEqual(4);
  });

  it('should add id to measurement', () => {
    const data = 2024;
    const measurements = [
      {
        sys: 120,
        dia: 80,
        pulse: 70,
        other: 'Test0',
        mood: 'TestOK0',
        recorded: new Date(),
      },
      {
        id: 1111,
        sys: 130,
        dia: 90,
        pulse: 40,
        other: 'Test1',
        mood: 'TestOK1',
        recorded: new Date(),
      },
    ];

    const action = addIdToLastMeasurement({ data });
    const result = bloodPressureReducer(
      {
        ...initialState,
        lastBloodPressure: measurements[0],
        lastTenBloodPressureData: measurements,
      },
      action
    );

    expect(result.lastBloodPressure.id).toEqual(2024);
    expect(result.lastTenBloodPressureData[0].id).toEqual(2024);
    expect(result.lastTenBloodPressureData[1].id).toEqual(1111);
  });

  it('should update measurement part1', () => {
    const lastTenBloodPressureData = [
      {
        sys: 100,
        dia: 10,
        pulse: 20,
        other: 'Test0',
        mood: 'TestOK0',
        recorded: new Date(),
        id: 2023,
      },
      {
        sys: 120,
        dia: 80,
        pulse: 70,
        other: 'Test1',
        mood: 'TestOK1',
        recorded: new Date(),
        id: 2024,
      },
      {
        sys: 150,
        dia: 50,
        pulse: 50,
        other: 'Test5',
        mood: 'TestOK5',
        recorded: new Date(),
        id: 2025,
      },
    ];

    const measurement = {
      sys: 111,
      dia: 11,
      pulse: 11,
      other: 'Test1',
      mood: 'TestOK1',
      recorded: new Date(),
      id: 2024,
    };

    const action = updateMeasurement({ id: 2024, measurement });
    const result = bloodPressureReducer(
      {
        ...initialState,
        lastBloodPressure: lastTenBloodPressureData[1],
        lastTenBloodPressureData,
      },
      action
    );

    const resultObj = result.lastTenBloodPressureData.find(
      (f) => f.id === 2024
    );
    expect(resultObj.id).toEqual(2024);
    expect(resultObj.mood).toEqual('TestOK1');
    expect(resultObj.other).toEqual('Test1');
    expect(resultObj.sys).toEqual(111);
  });

  it('should update measurement part2', () => {
    const lastTenBloodPressureData = [
      {
        sys: 100,
        dia: 10,
        pulse: 20,
        other: 'Test0',
        mood: 'TestOK0',
        recorded: new Date(),
        id: 2023,
      },
      {
        sys: 120,
        dia: 80,
        pulse: 70,
        other: 'Test1',
        mood: 'TestOK1',
        recorded: new Date(),
        id: 2024,
      },
      {
        sys: 150,
        dia: 50,
        pulse: 50,
        other: 'Test5',
        mood: 'TestOK5',
        recorded: new Date(),
        id: 2025,
      },
    ];

    const measurement = {
      sys: 111,
      dia: 11,
      pulse: 11,
      other: 'Test1',
      mood: 'TestOK1',
      recorded: new Date(),
      id: 2024,
    };

    const action = updateMeasurement({ id: 2024, measurement });
    const result = bloodPressureReducer(
      {
        ...initialState,
        lastTenBloodPressureData,
      },
      action
    );

    const resultObj = result.lastTenBloodPressureData.find(
      (f) => f.id === 2024
    );
    expect(resultObj.id).toEqual(2024);
    expect(resultObj.mood).toEqual('TestOK1');
    expect(resultObj.other).toEqual('Test1');
    expect(resultObj.sys).toEqual(111);
  });
});
