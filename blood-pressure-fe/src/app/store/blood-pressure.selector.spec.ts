import { selectLastBloodPressureData } from './blood-pressure.selectors';
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
    averageData: [],
    bloodDataByYear: [],
    lastTenBloodPressureData: [],
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
});
