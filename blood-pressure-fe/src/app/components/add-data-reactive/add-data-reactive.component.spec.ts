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

  it('should display "Minimum value is (50)." if the systolic value is less than 50', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[id="sys-0"]'
    ) as HTMLInputElement;

    sysInput.value = '10';
    sysInput.dispatchEvent(new Event('input'));
    sysInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const sysMinError = fixture.nativeElement.querySelector('#sys-min-error');

    expect(sysMinError.textContent).toContain('Minimum value is (50).');
    expect(sysMinError).not.toBeNull();
  });

  it('should display "Maximum value is (250)." if the systolic value is greater than 250', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[id="sys-0"]'
    ) as HTMLInputElement;

    sysInput.value = '260';
    sysInput.dispatchEvent(new Event('input'));
    sysInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const sysMaxError = fixture.nativeElement.querySelector('#sys-max-error');

    expect(sysMaxError.textContent).toContain('Maximum value is (250).');
    expect(sysMaxError).not.toBeNull();
  });

  it('should display "Sys is required" if we click into the input field and then out without entering anything', () => {
    const sysInput = fixture.nativeElement.querySelector(
      'input[id="sys-0"]'
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

    expect(diaRequired.textContent).toContain('Dia is required');
    expect(diaRequired).not.toBeNull();

    expect(pulseRequired.textContent).toContain('Pulse is required');
    expect(pulseRequired).not.toBeNull();
  });

  it('should add new form', () => {
    const addNewBtn = fixture.nativeElement.querySelector(
      '#add-new-data'
    ) as HTMLButtonElement;

    // Press the submit button
    addNewBtn.click();
    fixture.detectChanges();

    const data1 = fixture.nativeElement.querySelector('#data-idx-1');

    expect(data1.textContent).toContain('Data idx: 1');
    expect(data1).not.toBeNull();
  });

  it('should delete a form', () => {
    const deleteBtn = fixture.nativeElement.querySelector(
      '#delete-id-0'
    ) as HTMLButtonElement;

    // Press the submit button
    deleteBtn.click();
    fixture.detectChanges();

    const data0 = fixture.nativeElement.querySelector('#data-idx-0');
    expect(data0).toBeNull();
  });

  it('should add two blood pressure data', () => {
    const addNewBtn = fixture.nativeElement.querySelector(
      '#add-new-data'
    ) as HTMLButtonElement;

    // Press the submit button
    addNewBtn.click();
    fixture.detectChanges();

    const sys0Input = fixture.nativeElement.querySelector(
      'input[id="sys-0"]'
    ) as HTMLInputElement;
    sys0Input.value = '120';
    const dia0Input = fixture.nativeElement.querySelector(
      'input[id="dia-0"]'
    ) as HTMLInputElement;
    dia0Input.value = '80';
    const pulse0Input = fixture.nativeElement.querySelector(
      'input[id="pulse-0"]'
    ) as HTMLInputElement;
    pulse0Input.value = '70';

    const sys1Input = fixture.nativeElement.querySelector(
      'input[id="sys-1"]'
    ) as HTMLInputElement;
    sys1Input.value = '121';
    const dia1Input = fixture.nativeElement.querySelector(
      'input[id="dia-1"]'
    ) as HTMLInputElement;
    dia1Input.value = '81';
    const pulse1Input = fixture.nativeElement.querySelector(
      'input[id="pulse-1"]'
    ) as HTMLInputElement;
    pulse1Input.value = '71';
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '#submit-btn'
    ) as HTMLButtonElement;

    // Press the submit button
    submitButton.click();
    fixture.detectChanges();

    expect(sys0Input.textContent).toBe('');
    expect(sys1Input.textContent).toBe('');
    expect(dia0Input.textContent).toBe('');
    expect(dia1Input.textContent).toBe('');
    expect(pulse0Input.textContent).toBe('');
    expect(pulse1Input.textContent).toBe('');
  });
});
