import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BloodPressureType } from '../store/blood-pressure-type';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  lastData$: Observable<BloodPressureType>;

  constructor(private store: Store<{ bloodPressure: BloodPressureType }>) {
    this.lastData$ = this.store.select('bloodPressure');
  }

}
