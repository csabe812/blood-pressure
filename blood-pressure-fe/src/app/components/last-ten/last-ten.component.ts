import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { selectLastTenBloodPressureData } from '../../store/blood-pressure.selectors';

@Component({
  selector: 'app-last-ten',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HttpClientModule, RouterLink, DatePipe],
  templateUrl: './last-ten.component.html',
  styleUrl: './last-ten.component.scss',
})
export class LastTenComponent {
  store = inject(Store);
  data$?: Observable<BloodData[]> = this.store.select(
    selectLastTenBloodPressureData
  );
}
