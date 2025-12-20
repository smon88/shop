import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorConnectionComponent } from './error-connection.component';

describe('ErrorConnectionComponent', () => {
  let component: ErrorConnectionComponent;
  let fixture: ComponentFixture<ErrorConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
