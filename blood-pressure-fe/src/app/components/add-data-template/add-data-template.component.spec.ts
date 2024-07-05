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

  it('should display "Minimum value is (50)." if the systolic value is less than 50', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[name="sys"]'
    ) as HTMLInputElement;

    sysInput.value = '10';
    sysInput.dispatchEvent(new Event('input'));
    sysInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const sysMinError = fixture.nativeElement.querySelector('#sys-min-error');

    expect(sysMinError.textContent).toContain('Minimum value is (50).');
    expect(sysMinError).not.toBeNull();
    expect(sysMinError.classList).toContain('invalid-feedback');
  });

  it('should display "Maximum value is (250)." if the systolic value is greater than 250', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[name="sys"]'
    ) as HTMLInputElement;

    sysInput.value = '260';
    sysInput.dispatchEvent(new Event('input'));
    sysInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const sysMaxError = fixture.nativeElement.querySelector('#sys-max-error');

    expect(sysMaxError.textContent).toContain('Maximum value is (250).');
    expect(sysMaxError).not.toBeNull();
    expect(sysMaxError.classList).toContain('invalid-feedback');
  });

  it('should display "Sys is required" if we click into the input field and then out without entering anything', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[name="sys"]'
    ) as HTMLInputElement;

    sysInput.value = '';
    sysInput.dispatchEvent(new Event('input'));
    sysInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const sysRequired = fixture.nativeElement.querySelector(
      '#sys-required-error'
    );

    expect(sysRequired.textContent).toContain('Sys is required');
    expect(sysRequired).not.toBeNull();
    expect(sysRequired.classList).toContain('invalid-feedback');
  });

  it('should display several error messages if we click the submit button without entering anything', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '#submit-btn'
    ) as HTMLButtonElement;

    // Press the submit button
    submitButton.click();
    fixture.detectChanges();

    const sysRequired = fixture.nativeElement.querySelector(
      '#sys-required-error'
    );
    const diaRequired = fixture.nativeElement.querySelector(
      '#dia-required-error'
    );
    const pulseRequired = fixture.nativeElement.querySelector(
      '#pulse-required-error'
    );

    expect(sysRequired.textContent).toContain('Sys is required');
    expect(sysRequired).not.toBeNull();
    expect(sysRequired.classList).toContain('invalid-feedback');

    expect(diaRequired.textContent).toContain('Dia is required');
    expect(diaRequired).not.toBeNull();
    expect(diaRequired.classList).toContain('invalid-feedback');

    expect(pulseRequired.textContent).toContain('Pulse is required');
    expect(pulseRequired).not.toBeNull();
    expect(pulseRequired.classList).toContain('invalid-feedback');
  });
});
