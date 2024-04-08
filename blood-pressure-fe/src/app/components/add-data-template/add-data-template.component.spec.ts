import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataTemplateComponent } from './add-data-template.component';

describe('AddDataTemplateComponent', () => {
  let component: AddDataTemplateComponent;
  let fixture: ComponentFixture<AddDataTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDataTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
