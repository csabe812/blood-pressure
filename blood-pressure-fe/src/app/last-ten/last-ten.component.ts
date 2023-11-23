import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { BloodData } from '../model/blood-data';
import { BloodPressureService } from '../service/blood-pressure.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-last-ten',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HttpClientModule, RouterLink],
  templateUrl: './last-ten.component.html',
  styleUrl: './last-ten.component.scss',
  providers: [BloodPressureService],
})
export class LastTenComponent implements OnInit {
  data$: Observable<BloodData[]> = of([]);

  constructor(private bpService: BloodPressureService) {}

  ngOnInit(): void {
    this.data$ = this.bpService.lastNData(10);
  }
}
