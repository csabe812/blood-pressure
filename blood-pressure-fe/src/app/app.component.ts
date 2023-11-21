import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blood-pressure-fe';
  chart!: Chart;

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
            min: 50
          },
        },
      },
    });
  }

  changeData(year: number): void {
    this.http
      .get<any>('http://localhost:3000/average/' + year)
      .subscribe((data) => this.createChart(data));
  }

  createLineChart(): void {
    this.http
      .get<{year:number, sysAvg: number, diaAvg: number, pulseAvg: number}[]>('http://localhost:3000/average-by-year/')
      .subscribe((data: {year:number, sysAvg: number, diaAvg: number, pulseAvg: number}[]) => {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: data.map(m => m.year).sort(),
            datasets: [
              {
                label: 'SysAvg',
                data: data.sort((a, b)=> a.year - b.year).map(m =>m.sysAvg),
                borderWidth: 1,
              },
              {
                label: 'DiaAvg',
                data: data.sort((a, b)=> a.year - b.year).map(m =>m.diaAvg),
                borderWidth: 1,
              },
              {
                label: 'PulseAvg',
                data: data.sort((a, b)=> a.year - b.year).map(m =>m.pulseAvg),
                borderWidth: 1,
              },
            ],
          },

          options: {
            scales: {
              y: {
                min: 50
              },
            },
          },
        });
      });
  }
}
