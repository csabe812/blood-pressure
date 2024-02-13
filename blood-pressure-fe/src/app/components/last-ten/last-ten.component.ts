import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BloodData } from '../../models/blood-data';
import { BloodPressureService } from '../../services/blood-pressure.service';

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
