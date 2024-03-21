import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Observable, tap } from 'rxjs';
import { AverageData } from '../../models/average-data';
import { BloodPressureService } from '../../services/blood-pressure.service';
import {
  selectAverageData,
  selectAverageDataByYear,
} from '../../store/blood-pressure.selectors';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, AsyncPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  title = 'blood-pressure-fe';
  chart!: Chart;
  years: number[] = [];
  data$: Observable<AverageData[] | AverageData>;

  constructor(private store: Store, private bpService: BloodPressureService) {}

  ngOnInit(): void {
    this.createLineChart();
  }

  createChart(data: AverageData) {
    this.chart?.destroy();
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Sys', 'Dia', 'Pulse'],
        datasets: [
          {
            label: 'Averages',
            data: [data.sysAvg, data.diaAvg, data.pulseAvg],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 50,
          },
        },
      },
    });
  }

  changeData(year: number): void {
    /*this.http
      .get<any>(`${environment.API_URL}average/` + year)
      .subscribe((data) => this.createChart(data));*/
    this.data$ = this.store
      .select(selectAverageDataByYear(year))
      .pipe(tap((d: AverageData) => this.createChart(d)));
  }

  changeFullYearData(year: number): void {
    //this.store.dispatch(loadDataByYear({ year }));

    this.bpService.getDataByYear(year).subscribe((data) => {
      this.chart?.destroy();
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: [...data]
            .sort(
              (a, b) =>
                new Date(a.recorded).getTime() - new Date(b.recorded).getTime()
            )
            .map((a) => a.recorded),
          datasets: [
            {
              label: 'Sys',
              data: [...data]
                .sort(
                  (a, b) =>
                    new Date(a.recorded).getTime() -
                    new Date(b.recorded).getTime()
                )
                .map((m) => m.sys),
              borderWidth: 1,
            },
            {
              label: 'Dia',
              data: [...data]
                .sort(
                  (a, b) =>
                    new Date(a.recorded).getTime() -
                    new Date(b.recorded).getTime()
                )
                .map((m) => m.dia),
              borderWidth: 1,
            },
            {
              label: 'Pulse',
              data: [...data]
                .sort(
                  (a, b) =>
                    new Date(a.recorded).getTime() -
                    new Date(b.recorded).getTime()
                )
                .map((m) => m.pulse),
              borderWidth: 1,
            },
          ],
        },

        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 50,
            },
          },
        },
      });
    });
  }

  createLineChart(): void {
    this.data$ = this.store.select(selectAverageData).pipe(
      tap((data: AverageData[]) => {
        this.chart?.destroy();
        this.years = data.map((m) => m.year).sort();
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: data.map((m) => m.year).sort(),
            datasets: [
              {
                label: 'SysAvg',
                data: [...data]
                  .sort((a, b) => a.year - b.year)
                  .map((m) => m.sysAvg),
                borderWidth: 1,
              },
              {
                label: 'DiaAvg',
                data: [...data]
                  .sort((a, b) => a.year - b.year)
                  .map((m) => m.diaAvg),
                borderWidth: 1,
              },
              {
                label: 'PulseAvg',
                data: [...data]
                  .sort((a, b) => a.year - b.year)
                  .map((m) => m.pulseAvg),
                borderWidth: 1,
              },
            ],
          },

          options: {
            maintainAspectRatio: false,
            scales: {
              y: {
                min: 50,
              },
            },
          },
        });
      })
    );
  }
}
