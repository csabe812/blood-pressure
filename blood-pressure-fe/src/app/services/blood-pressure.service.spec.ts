import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AverageData } from '../models/average-data';
import { BloodData } from '../models/blood-data';
import { BloodPressureService } from './blood-pressure.service';

describe('BloodPressureService', () => {
  let service: BloodPressureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BloodPressureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve blood pressure data (by id) from the API via GET', () => {
    const mockBloodPressureData: BloodData = {
      id: 1,
      sys: 106,
      dia: 75,
      pulse: 64,
      recorded: new Date(2018, 8, 31, 14, 45),
      other: '',
    };
    service.getById(1).subscribe((bpData) => {
      expect(bpData).toEqual(mockBloodPressureData);
    });

    const request = httpMock.expectOne('http://localhost:5194/get-by-id/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockBloodPressureData);
  });

  it('should retrieve the LAST blood pressure data from the API via GET', () => {
    const mockBloodPressureData: BloodData[] = [
      {
        id: 297,
        sys: 100,
        dia: 100,
        pulse: 100,
        recorded: new Date(2024, 4, 26, 13, 21),
        other: '',
      },
    ];
    service.lastNData(1).subscribe((bpData) => {
      expect(bpData).toEqual(mockBloodPressureData);
    });

    const request = httpMock.expectOne('http://localhost:5194/last-n-data/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockBloodPressureData);
  });

  it('should retrieve all the years between 2018 and 2024 in a number array from the API via GET', () => {
    const mockYearData: number[] = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
    service.getYears().subscribe((years) => {
      expect(years).toEqual(mockYearData);
    });

    const request = httpMock.expectOne('http://localhost:5194/years');
    expect(request.request.method).toBe('GET');
    request.flush(mockYearData);
  });

  it('should retrieve blood pressure data (by year number) from the API via GET', () => {
    const mockBloodPressureData: BloodData[] = [
      {
        id: 1,
        sys: 106,
        dia: 75,
        pulse: 64,
        recorded: new Date(2018, 8, 31, 14, 45),
        other: '',
      },
    ];
    service.getDataByYear(2018).subscribe((bpData: BloodData[]) => {
      expect(bpData).toEqual(mockBloodPressureData);
    });
    const request = httpMock.expectOne(
      'http://localhost:5194/all-by-year/2018'
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockBloodPressureData);
  });

  it('should retrieve blood pressure average data (by year) from the API via GET', () => {
    const mockAvgData2018: AverageData[] = [
      {
        year: 2018,
        sysAvg: 132.225806451613,
        diaAvg: 78.6612903225806,
        pulseAvg: 63.1451612903226,
      },
    ];
    service.averageByYear().subscribe((avgData: AverageData[]) => {
      expect(avgData).toEqual(mockAvgData2018);
    });

    const request = httpMock.expectOne(
      'http://localhost:5194/average-by-year/'
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockAvgData2018);
  });

  it('should create blood pressure data from the API via POST', () => {
    const mockAddData: BloodData = {
      recorded: new Date(2024, 4, 29, 11, 11),
      sys: 100,
      dia: 100,
      pulse: 100,
      other: '100',
    };
    service.addData(mockAddData).subscribe((resp: BloodData) => {
      expect(resp).toEqual(mockAddData);
    });

    const request = httpMock.expectOne('http://localhost:5194/add');
    expect(request.request.method).toBe('POST');
    request.flush(mockAddData);
  });

  it('should create blood pressure data from the API via POST', () => {
    const mockAddData: BloodData = {
      recorded: new Date(2024, 4, 29, 11, 11),
      sys: 100,
      dia: 100,
      pulse: 100,
      other: '100',
    };
    const resp = { message: 'Bloodpressure updated successfully' };
    service.updateData(298, mockAddData).subscribe((resp: BloodData) => {
      expect(resp).toEqual(mockAddData);
    });

    const request = httpMock.expectOne('http://localhost:5194/update/298');
    expect(request.request.method).toBe('PATCH');
    request.flush(mockAddData);
  });

  it('should create blood pressure data from the API via POST', () => {
    const mockDataArray: BloodData[] = [
      {
        recorded: new Date(2024, 1, 1, 1, 1),
        sys: 101,
        dia: 101,
        pulse: 101,
        other: '101',
      },
      {
        recorded: new Date(2024, 2, 2, 2, 2),
        sys: 102,
        dia: 102,
        pulse: 102,
        other: '102',
      },
    ];
    const resp = { text: 'Added successfully.' };
    service.addDataArray(mockDataArray).subscribe((r: { text: string }) => {
      expect(resp).toEqual(r);
    });

    const request = httpMock.expectOne('http://localhost:5194/add-data-array');
    expect(request.request.method).toBe('POST');
    request.flush(resp);
  });
});
