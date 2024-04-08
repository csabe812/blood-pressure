import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BloodData } from '../models/blood-data';
import { BloodPressureService } from '../services/blood-pressure.service';
import {
  addIdToLastMeasurement,
  init,
  loadAverageData,
  loadAverageDataFailed,
  loadAverageDataSuccess,
  loadDataByYear,
  loadDataByYearFailed,
  loadDataByYearSuccess,
  loadYears,
  loadYearsFailed,
  loadYearsSuccess,
  saveMeasurement,
  set,
  updateMeasurement,
  updateMeasurementFailed,
  updateMeasurementSuccess,
} from './blood-pressure.actions';

@Injectable()
export class BloodPressureEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        return this.bloodPressureService.lastNData(10).pipe(
          map((resp) => {
            let measurements: BloodData[] = [
              { dia: 0, sys: 0, pulse: 0, other: '', recorded: new Date() },
            ];
            if (!resp || resp.length === 0) {
              return set({ measurements });
            } else {
              measurements = [...resp];
              return set({ measurements });
            }
          })
        );
      })
    )
  );

  saveMeasurement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveMeasurement),
      switchMap((d) => {
        return this.bloodPressureService.addData(d.measurement).pipe(
          map((resp) => {
            return addIdToLastMeasurement({ data: resp.id });
          })
        );
      })
    )
  );

  loadAverageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAverageData),
      switchMap(() => {
        return this.bloodPressureService.averageByYear().pipe(
          map((averageData) => loadAverageDataSuccess({ averageData })),
          catchError((error) => of(loadAverageDataFailed({ error })))
        );
      })
    )
  );

  loadDataByYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataByYear),
      switchMap(({ year }) => {
        return this.bloodPressureService.getDataByYear(year).pipe(
          map((data) => loadDataByYearSuccess({ data })),
          catchError((error) => of(loadDataByYearFailed({ error })))
        );
      })
    )
  );

  loadYears$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadYears),
      switchMap(() => {
        return this.bloodPressureService.getYears().pipe(
          map((data) => loadYearsSuccess({ data })),
          catchError((error) => of(loadYearsFailed({ error })))
        );
      })
    )
  );

  updateMeasurement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMeasurement),
      switchMap((d) => {
        return this.bloodPressureService.updateData(d.id, d.measurement).pipe(
          map((data) => updateMeasurementSuccess({ data })),
          catchError((error) => of(updateMeasurementFailed({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bloodPressureService: BloodPressureService
  ) {}
}
