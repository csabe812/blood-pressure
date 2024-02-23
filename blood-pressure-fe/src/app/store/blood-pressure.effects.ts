import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { BloodPressureService } from '../services/blood-pressure.service';
import { init, set } from './blood-pressure.actions';
import { Measurement } from './blood-pressure.state';

@Injectable()
export class BloodPressureEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        return this.bloodPressureService.lastNData(10).pipe(
          map((resp) => {
            let measurements: Measurement[] = [
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

  constructor(
    private actions$: Actions,
    private bloodPressureService: BloodPressureService
  ) {}
}
