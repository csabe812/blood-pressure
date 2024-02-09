import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodData } from '../model/blood-data';
import { environment } from '../../environments/environment';

@Injectable()
export class BloodPressureService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  addData(data: BloodData) {
    return this.http.post<BloodData>(this.url + 'add', data);
  }

  lastNData(n: number) {
    return this.http.get<BloodData[]>(this.url + `last-n-data/${n}`);
  }
}
