import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { BlooodPressureData } from './store/blood-pressure.state';

describe('AppComponent', () => {
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
      imports: [AppComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'Blood Pressure'
    );
  });
});
