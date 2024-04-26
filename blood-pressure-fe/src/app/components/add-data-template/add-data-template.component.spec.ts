import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AddDataTemplateComponent } from './add-data-template.component';

describe('AddDataTemplateComponent', () => {
  let component: AddDataTemplateComponent;
  let fixture: ComponentFixture<AddDataTemplateComponent>;

  const initialState = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddDataTemplateComponent,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDataTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
