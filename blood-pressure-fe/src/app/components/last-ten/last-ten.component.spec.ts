import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTenComponent } from './last-ten.component';

describe('LastTenComponent', () => {
  let component: LastTenComponent;
  let fixture: ComponentFixture<LastTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastTenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
