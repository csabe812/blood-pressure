import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLastTenBloodPressureData } from '../../store/blood-pressure.selectors';
import { Measurement } from '../../store/blood-pressure.state';

@Component({
  selector: 'app-last-ten',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HttpClientModule, RouterLink],
  templateUrl: './last-ten.component.html',
  styleUrl: './last-ten.component.scss',
})
export class LastTenComponent implements OnInit {
  data$?: Observable<Measurement[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store.select(selectLastTenBloodPressureData);
  }
}
