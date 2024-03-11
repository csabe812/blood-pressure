import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { selectLastBloodPressureData } from '../../store/blood-pressure.selectors';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  lastData$?: Observable<BloodData>;

  constructor(private store: Store) {
    this.lastData$ = this.store.select(selectLastBloodPressureData);
  }
}
