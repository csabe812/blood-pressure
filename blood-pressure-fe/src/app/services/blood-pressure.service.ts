import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AverageData } from '../models/average-data';
import { BloodData } from '../models/blood-data';

@Injectable({ providedIn: 'root' })
export class BloodPressureService {
  http = inject(HttpClient);

  url: string = environment.API_URL;

  addData(data: BloodData) {
    return this.http.post<BloodData>(this.url + 'add', data);
  }

  addDataArray(data: BloodData[]) {
    return this.http.post<{ text: string }>(this.url + 'add-data-array', data);
  }

  updateData(id: number, data: BloodData) {
    return this.http.patch(this.url + `update/${id}`, data);
  }

  getById(id: number) {
    return this.http.get<BloodData>(this.url + `get-by-id/${id}`);
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

  getYears() {
    return this.http.get<number[]>(`${this.url}years`);
  }
}
