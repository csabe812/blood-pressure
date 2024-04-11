import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { BloodPressureService } from '../../services/blood-pressure.service';
import {
  init,
  loadAverageData,
  loadYears,
} from '../../store/blood-pressure.actions';

type FormBloodData = FormGroup<{
  recorded: FormControl<Date>;
  sys: FormControl<number>;
  dia: FormControl<number>;
  pulse: FormControl<number>;
  other: FormControl<string>;
  mood: FormControl<string>;
}>;

type Form = FormGroup<{
  data: FormArray<FormBloodData>;
}>;

@Component({
  selector: 'app-add-data-reactive',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-data-reactive.component.html',
  styleUrl: './add-data-reactive.component.scss',
})
export class AddDataReactiveComponent implements OnDestroy {
  fb = inject(FormBuilder);
  bloodPressureService = inject(BloodPressureService);
  store = inject(Store);
  bloodDataForm: Form = this.fb.group({
    data: this.fb.array<FormBloodData>([this.generateFormBloodData()]),
  });
  moods = ['Good', 'Average', 'Bad'];
  submitted = false;
  addSetOfDataSubscription: Subscription;

  generateFormBloodData(): FormBloodData {
    return this.fb.group({
      sys: new FormControl(null, [
        Validators.required,
        Validators.min(50),
        Validators.max(250),
      ]),
      dia: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(200),
      ]),
      pulse: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(220),
      ]),
      other: new FormControl(''),
      mood: new FormControl(''),
      recorded: new FormControl(new Date()),
    });
  }

  onAddNewData() {
    this.submitted = false;
    this.bloodDataForm.controls.data.push(this.generateFormBloodData());
  }

  onSubmit() {
    this.submitted = true;
    if (this.bloodDataForm.invalid) return;
    const bloodDataArray: BloodData[] = [];
    for (let i of this.bloodDataForm.getRawValue().data) {
      bloodDataArray.push({
        ...i,
      });
    }
    // TODO: state management
    this.addSetOfDataSubscription = this.bloodPressureService
      .addDataArray(bloodDataArray)
      .subscribe((resp) => {
        console.log(resp);
        this.submitted = false;
        this.bloodDataForm.controls.data.clear();

        this.store.dispatch(init());
        this.store.dispatch(loadAverageData());
        this.store.dispatch(loadYears());
      });
  }

  onDeleteDataById(idx: number) {
    this.bloodDataForm.controls.data.removeAt(idx);
    if (this.bloodDataForm.controls.data.length === 0) this.submitted = false;
  }

  ngOnDestroy(): void {
    this.addSetOfDataSubscription?.unsubscribe();
  }
}
