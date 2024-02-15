import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { hasData, selectBloodPressureData } from '../../store/blood-pressure.selectors';
import { BloodPressureType } from '../../store/blood-pressure.state';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  lastData$: Observable<BloodPressureType>;
  hasData$: Observable<boolean>;

  constructor(private store: Store<{ bloodPressure: BloodPressureType }>) {
    this.hasData$ = this.store.select(hasData);
    this.lastData$ = this.store.select(selectBloodPressureData);
  }

}
