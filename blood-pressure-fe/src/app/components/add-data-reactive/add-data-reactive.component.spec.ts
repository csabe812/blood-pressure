import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AddDataReactiveComponent } from './add-data-reactive.component';

describe('AddDataReactiveComponent', () => {
  let component: AddDataReactiveComponent;
  let fixture: ComponentFixture<AddDataReactiveComponent>;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddDataReactiveComponent,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDataReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
