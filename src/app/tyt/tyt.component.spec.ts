import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TytComponent } from './tyt.component';

describe('TytComponent', () => {
  let component: TytComponent;
  let fixture: ComponentFixture<TytComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TytComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TytComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
