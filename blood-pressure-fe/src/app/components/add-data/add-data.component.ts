import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BloodData } from '../../models/blood-data';
import { saveMeasurement } from '../../store/blood-pressure.actions';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss',
})
export class AddDataComponent {
  form: FormGroup = new FormGroup({
    sys: new FormControl('', [Validators.required]),
    dia: new FormControl('', [Validators.required]),
    pulse: new FormControl('', [Validators.required]),
    other: new FormControl(''),
  });

  constructor(private store: Store, private router: Router) {}

  saveData(): void {
    const data: BloodData = {
      recorded: new Date(),
      sys: this.form.controls.sys.value,
      dia: this.form.controls.dia.value,
      pulse: this.form.controls.pulse.value,
      other: this.form.controls.other.value,
    };
    this.store.dispatch(saveMeasurement({ measurement: { ...data } }));
    this.router.navigate(['/']);
  }
}
