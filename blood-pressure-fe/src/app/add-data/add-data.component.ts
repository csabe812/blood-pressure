import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BloodPressureService } from '../service/blood-pressure.service';
import { Subscription } from 'rxjs';
import { BloodData } from '../model/blood-data';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss',
  providers: [BloodPressureService],
})
export class AddDataComponent implements OnDestroy {
  addDataSubscription?: Subscription;

  form: FormGroup = new FormGroup({
    sys: new FormControl('', [Validators.required]),
    dia: new FormControl('', [Validators.required]),
    pulse: new FormControl('', [Validators.required]),
    other: new FormControl(''),
  });

  constructor(private bpService: BloodPressureService) {}

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
      .subscribe((resp) => {
        this.form.reset();
      });
  }
}
