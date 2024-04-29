import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BlooodPressureData } from '../../store/blood-pressure.state';
import { AddDataComponent } from './add-data.component';

describe('AddDataComponent', () => {
  let component: AddDataComponent;
  let fixture: ComponentFixture<AddDataComponent>;

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
      imports: [AddDataComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
