import {
  selectAverageDataByYear,
  selectDataById,
  selectLastBloodPressureData,
  selectYearData,
} from './blood-pressure.selectors';
import { BlooodPressureData } from './blood-pressure.state';

describe('BlooodPressureData', () => {
  const currentDate = new Date();
  const initialState: BlooodPressureData = {
    lastBloodPressure: {
      sys: 120,
      dia: 80,
      pulse: 72,
      other: 'Just a message',
      recorded: currentDate,
    },
    averageData: [
      {
        year: 2018,
        diaAvg: 88,
        pulseAvg: 78,
        sysAvg: 128,
      },
      {
        year: 2019,
        diaAvg: 89,
        pulseAvg: 79,
        sysAvg: 129,
      },
    ],
    bloodDataByYear: [
      { sys: 200, dia: 180, pulse: 170, other: 'Other1', recorded: new Date() },
    ],
    lastTenBloodPressureData: [
      {
        sys: 166,
        dia: 76,
        pulse: 86,
        other: 'JustATest',
        recorded: new Date(),
        id: 166,
      },
    ],
    years: [],
  };

  it('should select the last blood pressure data', () => {
    expect(
      selectLastBloodPressureData({ bloodPressure: initialState })
    ).toEqual({
      sys: 120,
      dia: 80,
      pulse: 72,
      other: 'Just a message',
      recorded: currentDate,
    });
  });

  it('should select avg data from 2018', () => {
    const result = selectAverageDataByYear(2018).projector(initialState);
    expect(result).toEqual({
      year: 2018,
      diaAvg: 88,
      pulseAvg: 78,
      sysAvg: 128,
    });
  });

  it('should select blood pressure year data', () => {
    const result = selectYearData({ bloodPressure: initialState });
    expect(result.length).toEqual(1);
    expect(result[0].sys).toEqual(200);
  });

  it('should select data by id', () => {
    const result = selectDataById(166).projector(initialState);
    expect(result.id).toEqual(166);
    expect(result.sys).toEqual(166);
    expect(result.dia).toEqual(76);
    expect(result.pulse).toEqual(86);
  });
});
