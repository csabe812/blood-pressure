import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { selectLastBloodPressureData } from '../../store/blood-pressure.selectors';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  store = inject(Store);
  lastData$: Observable<BloodData> = this.store.select(
    selectLastBloodPressureData
  );
}
