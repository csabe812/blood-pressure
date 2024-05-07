import { barOptions, createDiagram, lineOptions } from './diagram-creator';

describe('Diagram Creator', () => {
  it('should create a bar diagram with average data', () => {
    const barObj = createDiagram(
      'bar',
      ['Systolic', 'Diastolic', 'Pulse'],
      [
        {
          label: 'Average',
          data: [120, 80, 70],
          borderWidth: 1,
        },
      ],
      { minValue: 110, maxValue: 200 }
    );
    expect(barObj).not.toBeUndefined();
    expect(barObj).not.toBeNaN();
    expect(barObj).not.toBeFalsy();
  });

  it('should create a line diagram with average data', () => {
    const barObj = createDiagram(
      'line',
      ['2024'],
      [
        {
          label: 'Systolic (average)',
          data: [{ year: 2024, sysAvg: 120, diaAvg: 80, pulseAvg: 70 }],
          borderWidth: 1,
        },
      ],
      { minValue: 50, maxValue: 250 }
    );
    expect(barObj).not.toBeUndefined();
    expect(barObj).not.toBeNaN();
    expect(barObj).not.toBeFalsy();
  });

  it('should create line options', () => {
    const lineOptionsObj = lineOptions({ minValue: 100, maxValue: 200 });
    expect(lineOptionsObj).toEqual({
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 90,
          max: 210,
        },
      },
    });
  });

  it('should create bar options', () => {
    const barOptionsObj = barOptions({ minValue: 100, maxValue: 200 });
    expect(barOptionsObj).toEqual({
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 80,
          max: 210,
        },
      },
    });
  });
});
