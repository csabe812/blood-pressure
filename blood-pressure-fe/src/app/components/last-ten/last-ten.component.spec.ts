import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BlooodPressureData } from '../../store/blood-pressure.state';
import { LastTenComponent } from './last-ten.component';

describe('LastTenComponent', () => {
  let component: LastTenComponent;
  let fixture: ComponentFixture<LastTenComponent>;

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
      imports: [LastTenComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LastTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
