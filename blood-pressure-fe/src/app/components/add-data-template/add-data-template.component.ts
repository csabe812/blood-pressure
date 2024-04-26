import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { BloodPressureService } from '../../services/blood-pressure.service';
import {
  saveMeasurement,
  updateMeasurement,
} from '../../store/blood-pressure.actions';
import { selectDataById } from '../../store/blood-pressure.selectors';

@Component({
  selector: 'app-add-data-template',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, AsyncPipe],
  templateUrl: './add-data-template.component.html',
  styleUrl: './add-data-template.component.scss',
})
export class AddDataTemplateComponent implements OnInit, OnDestroy {
  @ViewChild('bloodDataForm', { static: false }) bloodDataForm: NgForm;

  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);
  bloodPressureService = inject(BloodPressureService);

  serviceSubscription: Subscription;

  moods = ['Good', 'Average', 'Bad'];

  id?: number;
  model$: Observable<BloodData> = of({
    sys: null,
    dia: null,
    pulse: null,
    mood: '',
    other: '',
    recorded: new Date(),
  });

  submitted = false;

  ngOnInit(): void {
    const idRoute = this.route.snapshot.paramMap.get('id');
    if (idRoute) {
      this.id = +idRoute;
      this.model$ = this.store.select(selectDataById(this.id));
    }
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    if (this.bloodDataForm.form.invalid) return;
    const data: BloodData = {
      recorded: new Date(),
      sys: this.bloodDataForm.controls.sys.value,
      dia: this.bloodDataForm.controls.dia.value,
      pulse: this.bloodDataForm.controls.pulse.value,
      other: this.bloodDataForm.controls.other.value,
      mood: this.bloodDataForm.controls.mood.value,
    };
    if (this.id) {
      this.bloodPressureService
        .updateData(this.id, data)
        .subscribe((resp) => {});
      this.store.dispatch(
        updateMeasurement({ id: this.id, measurement: { ...data } })
      );
      this.router.navigate(['/last-ten']);
    } else {
      this.store.dispatch(saveMeasurement({ measurement: { ...data } }));
      this.router.navigate(['/']);
    }
  }
}
