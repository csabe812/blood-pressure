import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type BloodData = {
  sys: number,
  dia: number,
  pulse: number,
  date: Date,
  other: string
};

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss'
})
export class AddDataComponent {
  form: FormGroup = new FormGroup({
    sys: new FormControl(),
    dia: new FormControl(),
    pulse: new FormControl(),
    other: new FormControl()
  });

  constructor(private http: HttpClient){}

  saveData(): void {
    this.http.post<BloodData>('http://localhost:3000/add', {
      date: new Date(),
      sys: this.form.controls.sys.value,
      dia: this.form.controls.dia.value,
      pulse: this.form.controls.pulse.value,
      other: this.form.controls.other.value,
      
    }).subscribe((resp) => console.log(resp));
  }
}
