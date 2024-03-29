import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  title = 'blood-pressure-fe';
  chart!: Chart;
  years: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.createLineChart();
    //this.http
    //  .get<any>('http://localhost:3000/average')
    //  .subscribe((data) => this.createChart(data));
  }

  createChart(data: any) {
    if (this.chart) {
      this.chart.destroy();
    }
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
    this.http
      .get<any>('http://localhost:5194/average/' + year)
      .subscribe((data) => this.createChart(data));
  }

  changeFullYearData(year: number): void {
    this.http.get<any>('http://localhost:5194/all-by-year/' + year).subscribe(
      (
        data: {
          id: number;
          recorded: string;
          other: string;
          sys: number;
          dia: number;
          pulse: number;
        }[]
      ) => {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: data
              .sort((a, b) => a.recorded.localeCompare(b.recorded))
              .map((a) => a.recorded),
            datasets: [
              {
                label: 'Sys',
                data: data
                  .sort((a, b) => a.recorded.localeCompare(b.recorded))
                  .map((m) => m.sys),
                borderWidth: 1,
              },
              {
                label: 'Dia',
                data: data
                  .sort((a, b) => a.recorded.localeCompare(b.recorded))
                  .map((m) => m.dia),
                borderWidth: 1,
              },
              {
                label: 'Pulse',
                data: data
                  .sort((a, b) => a.recorded.localeCompare(b.recorded))
                  .map((m) => m.pulse),
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
    );
  }

  createLineChart(): void {
    this.http
      .get<
        { year: number; sysAvg: number; diaAvg: number; pulseAvg: number }[]
      >('http://localhost:5194/average-by-year/')
      .subscribe(
        (
          data: {
            year: number;
            sysAvg: number;
            diaAvg: number;
            pulseAvg: number;
          }[]
        ) => {
          if (this.chart) {
            this.chart.destroy();
          }
          this.years = data.map((m) => m.year).sort();
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: data.map((m) => m.year).sort(),
              datasets: [
                {
                  label: 'SysAvg',
                  data: data
                    .sort((a, b) => a.year - b.year)
                    .map((m) => m.sysAvg),
                  borderWidth: 1,
                },
                {
                  label: 'DiaAvg',
                  data: data
                    .sort((a, b) => a.year - b.year)
                    .map((m) => m.diaAvg),
                  borderWidth: 1,
                },
                {
                  label: 'PulseAvg',
                  data: data
                    .sort((a, b) => a.year - b.year)
                    .map((m) => m.pulseAvg),
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
      );
  }
}
