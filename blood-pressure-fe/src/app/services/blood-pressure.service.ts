import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AverageData } from '../models/average-data';
import { BloodData } from '../models/blood-data';

@Injectable({ providedIn: 'root' })
export class BloodPressureService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  addData(data: BloodData) {
    return this.http.post<BloodData>(this.url + 'add', data);
  }

  lastNData(n: number) {
    return this.http.get<BloodData[]>(this.url + `last-n-data/${n}`);
  }

  averageByYear() {
    return this.http.get<AverageData[]>(this.url + 'average-by-year/');
  }

  getDataByYear(year: number) {
    return this.http.get<BloodData[]>(`${this.url}all-by-year/${year}`);
  }
}
