import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataReactiveComponent } from './add-data-reactive.component';

describe('AddDataReactiveComponent', () => {
  let component: AddDataReactiveComponent;
  let fixture: ComponentFixture<AddDataReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDataReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
