import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { BloodPressureService } from '../../services/blood-pressure.service';
import { saveMeasurement } from '../../store/blood-pressure.actions';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss',
})
export class AddDataComponent implements OnDestroy {
  addDataSubscription?: Subscription;

  form: FormGroup = new FormGroup({
    sys: new FormControl('', [Validators.required]),
    dia: new FormControl('', [Validators.required]),
    pulse: new FormControl('', [Validators.required]),
    other: new FormControl(''),
  });

  constructor(private bpService: BloodPressureService, private store: Store) {}

  ngOnDestroy(): void {
    this.addDataSubscription?.unsubscribe();
  }

  saveData(): void {
    const data: BloodData = {
      recorded: new Date(),
      sys: this.form.controls.sys.value,
      dia: this.form.controls.dia.value,
      pulse: this.form.controls.pulse.value,
      other: this.form.controls.other.value,
    };
    this.addDataSubscription = this.bpService
      .addData(data)
      .pipe(
        tap(() => {
          this.store.dispatch(saveMeasurement({ measurement: { ...data } }));
        })
      )
      .subscribe((resp) => {
        this.form.reset();
      });
  }
}
