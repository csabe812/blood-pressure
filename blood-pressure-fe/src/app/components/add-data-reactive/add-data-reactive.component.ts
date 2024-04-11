import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-data-reactive.component.html',
  styleUrl: './add-data-reactive.component.scss',
})
export class AddDataReactiveComponent {
  fb = inject(FormBuilder);
  bloodDataForm: Form = this.fb.group({
    data: this.fb.array<FormBloodData>([this.generateFormBloodData()]),
  });
  moods = ['Good', 'Average', 'Bad'];
  submitted = false;

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
      other: '',
      mood: '',
      recorded: new Date(),
    });
  }

  onAddNewData() {
    this.submitted = false;
    this.bloodDataForm.controls.data.push(this.generateFormBloodData());
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.bloodDataForm.getRawValue());
  }

  onDeleteDataById(idx: number) {
    this.bloodDataForm.controls.data.removeAt(idx);
    if (this.bloodDataForm.controls.data.length === 0) this.submitted = false;
  }
}
