import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BlooodPressureData } from '../../store/blood-pressure.state';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  const initialState: BlooodPressureData = {
    lastBloodPressure: {
      sys: 0,
      dia: 0,
      pulse: 0,
      other: '',
      recorded: new Date(),
    },
    lastTenBloodPressureData: [],
    averageData: [],
    bloodDataByYear: [],
    years: [],
  };
  {
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
