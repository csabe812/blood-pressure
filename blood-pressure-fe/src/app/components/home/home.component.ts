import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastBloodPressureData } from '../../store/blood-pressure.selectors';
import { Measurement } from '../../store/blood-pressure.state';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  lastData$?: Observable<Measurement>;

  constructor(private store: Store) {
    this.lastData$ = this.store.select(selectLastBloodPressureData);
  }
}
