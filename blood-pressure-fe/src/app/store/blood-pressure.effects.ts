import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BloodPressureService } from '../services/blood-pressure.service';
import { loadLastData, saveData } from './blood-pressure.actions';
import { BloodPressureType } from './blood-pressure.state';

@Injectable()
export class BloodPressureEffects {
  loadLastData2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveData),
        tap((action) =>
          localStorage.setItem('lastData', JSON.stringify(action.bloodPressure))
        )
      ),
    { dispatch: false }
  );

  loadLastData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadLastData),
        switchMap(() =>
          this.bloodPressureService.lastNData(1).pipe(
            map((resp) =>
              this.store.dispatch(saveData({ bloodPressure: { ...resp[0] } }))
            ),
            catchError((err) =>
              of(
                this.store.dispatch(
                  saveData({
                    bloodPressure: {
                      sys: 111,
                      dia: 222,
                      pulse: 333,
                      other: 'na',
                    },
                  })
                )
              )
            )
          )
        )
        /*tap(() => {
          console.log('AM I HERE?');
          this.bloodPressureService.lastNData(1).pipe(
            map((data) => {
              console.log('still here?');
              if (data && data.length === 1) {
                const bpData = data[0];
                if (bpData.sys > 0 && bpData.dia > 0 && bpData.pulse > 0) {
                  this.store.dispatch(
                    saveData({ bloodPressure: { ...bpData } })
                  );
                }
              }
            })
          );
        })*/
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bloodPressureService: BloodPressureService,
    private store: Store<{ bloodPressure: BloodPressureType }>
  ) {}
}
