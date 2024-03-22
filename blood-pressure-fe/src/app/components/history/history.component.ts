import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Observable, tap } from 'rxjs';
import { AverageData } from '../../models/average-data';
import { BloodData } from '../../models/blood-data';
import { BloodPressureService } from '../../services/blood-pressure.service';
import { loadDataByYear } from '../../store/blood-pressure.actions';
import {
  selectAverageData,
  selectAverageDataByYear,
  selectYearData,
} from '../../store/blood-pressure.selectors';
import { createDiagram } from '../../utils/diagram-creator';

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
  data$: Observable<AverageData[] | AverageData | BloodData[]>;

  constructor(private store: Store, private bpService: BloodPressureService) {}

  ngOnInit(): void {
    this.createLineChart();
  }

  createChart(data: AverageData) {
    this.chart?.destroy();
    const labels = ['Sys', 'Dia', 'Pulse'];
    const datasets = [
      {
        label: 'Averages',
        data: [data.sysAvg, data.diaAvg, data.pulseAvg],
        borderWidth: 1,
      },
    ];
    const maxValue = data.sysAvg;
    const minValue = data.pulseAvg;
    const ranges = {
      minValue,
      maxValue,
    };
    this.chart = createDiagram('bar', labels, datasets, ranges);
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
    this.store.dispatch(loadDataByYear({ year }));

    this.data$ = this.store.select(selectYearData).pipe(
      tap((data: BloodData[]) => {
        this.chart?.destroy();
        const labels = [...data]
          .sort(
            (a, b) =>
              new Date(a.recorded).getTime() - new Date(b.recorded).getTime()
          )
          .map((a) => a.recorded);
        const datasets = [
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
        ];

        const minValue = data
          .map((m) => m.pulse)
          .sort((a, b) => a - b)
          .at(0);
        const maxValue = data
          .map((m) => m.sys)
          .sort((a, b) => b - a)
          .at(0);
        const ranges = {
          minValue,
          maxValue,
        };
        this.chart = createDiagram('line', labels, datasets, ranges);
      })
    );
  }

  createLineChart(): void {
    this.data$ = this.store.select(selectAverageData).pipe(
      tap((data: AverageData[]) => {
        this.chart?.destroy();
        this.years = data.map((m) => m.year).sort();
        const labels = data.map((m) => m.year).sort();
        const datasets = [
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
        ];
        const minValue = data
          .map((m) => m.pulseAvg)
          .sort((a, b) => a - b)
          .at(0);
        const maxValue = data
          .map((m) => m.sysAvg)
          .sort((a, b) => b - a)
          .at(0);
        const ranges = {
          minValue,
          maxValue,
        };
        this.chart = createDiagram('line', labels, datasets, ranges);
      })
    );
  }
}
