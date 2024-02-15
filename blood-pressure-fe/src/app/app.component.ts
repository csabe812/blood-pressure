import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadLastData } from './store/blood-pressure.actions';
import { BloodPressureType } from './store/blood-pressure.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store<{ bloodPressure: BloodPressureType }>) {
    this.store.dispatch(loadLastData());
  }
}
